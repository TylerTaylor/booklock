import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
    name: 'filter'
})

export class FilterPipe implements PipeTransform {
    transform(items: any[], searchText: string): any[] {
        if(!items) return [];
        if(!searchText) return items;

        searchText = searchText.toLowerCase();

        if (searchText == "is_favorite") {
            debugger;
        }

        return items.filter( item => {
            // look for match in name || tags
            return ( item.name.toLowerCase().includes(searchText) || this.filterTags(item, searchText) );
        });
    }

    filterTags(item, searchText){
        for(let i=0; i < item.tags.length; i++){
            if (item.tags[i].name.includes(searchText)){
                return item;
            }
        }
    }

    filterFavorites(items, value) {
        let filtered = items.filter(item => {
            return item.is_favorite == true
        })
        return filtered
    }

    filterReadingList(items, value) {
        let filtered = items.filter(item => {
            return item.reading_list == true
        })
        return filtered
    }

}