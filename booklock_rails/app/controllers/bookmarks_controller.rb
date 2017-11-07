class BookmarksController < ApplicationController
  before_action :set_bookmark, only: [:show, :update, :destroy]

  # GET /bookmarks
  def index
    if params[:tag]
      @bookmarks = Bookmark.tagged_with(params[:tag])
    else
      @bookmarks = Bookmark.where(user_id: @current_user.id).order('created_at DESC')
    end

    render json: @bookmarks, :include => :tags
  end

  # GET /bookmarks/1
  def show
    render json: @bookmark, :include => :tags
  end

  # POST /bookmarks
  def create
    # @bookmark = Bookmark.new(bookmark_params)
    @bookmark = @current_user.bookmarks.build(bookmark_params)

    if @bookmark.save
      render json: @bookmark, status: :created, location: @bookmark
    else
      render json: @bookmark.errors, status: :unprocessable_entity
    end
  end

  # PATCH/PUT /bookmarks/1
  def update
    if @bookmark.update(bookmark_params)
      render json: @bookmark
    else
      render json: @bookmark.errors, status: :unprocessable_entity
    end
  end

  # DELETE /bookmarks/1
  def destroy
    @bookmark.destroy
  end

  def parse
    # binding.pry
    path = params["uploadFile"].path

    # WARNING: Command Injection vulnerability...
    bookmarks_xml = `plutil -convert xml1 -o - #{path}`

    # ATTEMPT TO FIX: this just returns "true" for some reason...
    # bookmarks_xml = system("plutil", "-convert", "xml1", "-o", "-", path)

    # We also need to do this for actual bookmarks, not just reading list
    build_reading_list(bookmarks_xml)
  end

  def build_reading_list(plist_file)

    begin
      # first we parse the xml
      # grab the "Children"
      # select the ones with the title "ReadingList"
      # get THOSE child elements
      # collect all the URLStrings
      reading_list_objects = Plist.parse_xml(plist_file)["Children"].select{|e|e["Title"]=="com.apple.ReadingList"}[0]["Children"]

      new_reading_list = []

      reading_list_objects.each do |obj|
        new_bookmark = {}

        # For each link object we have
        obj.each do |key, val|
          
          # Two separate if statements because we want both.. is this the best way to go about it?
          if key == "URIDictionary"
            new_bookmark["title"] = val["title"]
          end

          if key == "URLString"
            new_bookmark["url"] = val
          end

        end # end obj.each

        new_reading_list << new_bookmark
      end

    rescue NoMethodError => e
      puts "Your reading list is empty."
    end # /begin

    # Here is where we actually create our bookmark objects
    new_reading_list.reverse_each do |bookmark|
      # TODO: Do we want to keep track of how many successfully save and how many / which get rejected?
      # that way we can show the user what got rejected and why?
      @current_user.bookmarks.create(name: bookmark["title"], url: bookmark["url"], reading_list: true)
    end

  end

  private

    def set_bookmark
      @bookmark = Bookmark.find(params[:id])
    end

    def bookmark_params
      params.permit(:name, :url, :tag_list)
    end

end
