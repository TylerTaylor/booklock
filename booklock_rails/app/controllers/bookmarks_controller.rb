class BookmarksController < ApplicationController
  before_action :set_bookmark, only: [:show, :update, :destroy, :increase_view_count]

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
    # build_reading_list(bookmarks_xml)
    build_bookmarks_list(bookmarks_xml)
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

  def build_bookmarks_list(plist_file)
    
    # begin
      # first we parse the xml
      # grab the "Children"
      # select the ones with the title "ReadingList"
      # get THOSE child elements
      # collect all the URLStrings
      data = Plist.parse_xml(plist_file)
      reading_list_objects = Plist.parse_xml(plist_file)["Children"].select{|e|e["Title"]=="com.apple.ReadingList"}[0]["Children"]

      bookmarks_data = data["Children"].select{|e|e['Title']!="com.apple.ReadingList"}
      new_bookmarks = []

      bookmark_folders = bookmarks_data.select { |b| b['WebBookmarkType'] == 'WebBookmarkTypeList' }
      bookmark_leafs = bookmarks_data.select { |b| b['WebBookmarkType'] == 'WebBookmarkTypeLeaf' }

      # Here we select all our folders
      bookmarks_menu = bookmarks_data.select { |b| b['Title'] == 'BookmarksMenu' }[0]
      # Loop through each folder
      bookmark_folders.each do |b|
        puts " "
        puts "FOLDER TITLE"
        puts b['Title'] #=> prints out the title... we dont really care about this, just for figuring stuff out
        puts " "

        # b["Children"] is where we can find our links inside the bookmark folder

        # in the BookmarksMenu folder we have more children

        # child["URIDictionary"]["title"] => link name
        # child["URLString"] => URL
        # child["WebBookmarkType"] should == "WebBookmarkTypeLeaf" for a bookmark and "WebBookmarkTypeList" for a folder. handle that later.

        # Strip away the extra first layer
        items = b["Children"]

        # if our items even exist
        if items
          # loop through each item
          items.each do |item|
            if item['WebBookmarkType'] == 'WebBookmarkTypeList'
              folder = item
              # We have a folder, do something with it -- then do something with the items inside
  
                # Create a folder in rails?
                # Then build out the items and associate with this folder?
              
              # folder['Title'] => gives us our folder title
  
              puts " "
              puts " "
              puts "Here we should create a folder: #{folder["Title"]}"
              puts " "
              puts " "

              # TODO: Create folder object
              # binding.pry
  
              # our "item" aka folder contains other items, iterate through them to create?
              folder.each do |link|
                # We need to check if l[1] is an array first, currently it is breaking when it comes across
                #   a string, which is one of our folder titles "DEV tuts and projects"
                bookmarks_in_folder = (link[1].is_a?(Array)) ? link[1] : nil
                if bookmarks_in_folder
                  puts " "
                  puts " "
                  puts "Here we should create these bookmarks in the folder - #{folder['Title']}"
                  puts " "
                  puts " "
                  bookmarks_in_folder.each do |x|
                    # If we have x["Title"] then we have another folder. or we can check for the WebBookmarkType again...
                    # if we have x["URLString"] then we have a item within this folder (item)
                    if x["Title"]
                      puts "WE HAVE ANOTHER FOLDER - #{x['Title']}"
                      # TODO: Handle a folder within another folder... and links within that... ugh
                      # binding.pry
                    elsif x["URLString"]
                      puts "-- #{x["URIDictionary"]["title"]}"
                      # TODO: Create a bookmark that belongs to this folder
                      # binding.pry
                    end
                  end
                end
                # binding.pry
              end
            elsif item['WebBookmarkType'] == 'WebBookmarkTypeLeaf'
              # We have an individual bookmark within a folder already? how do we know what folder?
  
              # link['URLString'] => url
              # link['URIDictionary']['title'] => name
              # binding.pry
              puts "item: #{item['URIDictionary']['title']}"
            end
            # puts "-- #{link["URIDictionary"]["title"]}"
          end
        end

      puts "END OF BOOKMARK_FOLDERS.EACH LOOP."
      puts "Does this look correct??"
      end # end bookmark_folders.each

      puts " "
      puts " "
      puts "************* 'BOOKMARK LEAFS' *************"
      
      # We don't have to reverse this array, opposed to the reading list.
      bookmark_leafs.each do |bookmark|
        # TODO: Create individual bookmark here, no folder
        # THIS IS WORKING but commented out for more testing

        # @current_user.bookmarks.create(name: bookmark['URIDictionary']['title'], url: bookmark['URLString'], reading_list: false)
      end

      

      # new_reading_list = []

      # reading_list_objects.each do |obj|
      #   new_bookmark = {}

      #   # For each link object we have
      #   obj.each do |key, val|
          
      #     # Two separate if statements because we want both.. is this the best way to go about it?
      #     if key == "URIDictionary"
      #       new_bookmark["title"] = val["title"]
      #     end

      #     if key == "URLString"
      #       new_bookmark["url"] = val
      #     end

      #   end # end obj.each

      #   new_reading_list << new_bookmark
      # end

    # rescue NoMethodError => e
    #   binding.pry
    #   puts "Your reading list is empty."
    # end # /begin

    # Here is where we actually create our bookmark objects
    # new_reading_list.reverse_each do |bookmark|
    #   # TODO: Do we want to keep track of how many successfully save and how many / which get rejected?
    #   # that way we can show the user what got rejected and why?
    #   @current_user.bookmarks.create(name: bookmark["title"], url: bookmark["url"], reading_list: true)
    # end

  end

  def increase_view_count
    @bookmark.view_count += 1
    @bookmark.save
    render json: @bookmark, :include => :tags
  end

  private

    def set_bookmark
      @bookmark = Bookmark.find(params[:id])
    end

    def bookmark_params
      params.permit(:name, :url, :tag_list)
    end

end
