/*
Author:Jimmy
Email :jimmy31071987@gmail.com
*/

/*
 * Author: Jimmy
 */
function squel() {

    var arrayConstructor = [].constructor;
    var objectConstructor = {}.constructor;

    this.getItem = getitemByPropertyValue;
    this.getItemContains = getItemContainsPropertyValue;
    this.Insert = InsertItem;
    this.Update = UpdateItem;
    this.Delete = DeleteItem;
    this.Sort = SortList;
    
    function getItemContainsPropertyValue(list, propertyKey, propertyValue, caseInsensitive=false) {
        this.Result = [];
        if (propertyKey == null || propertyKey == 'undefined' || propertyKey == '') {
            throw "property is missing";
        }
        if (propertyValue == null || propertyValue == 'undefined' || propertyValue == '') {
            throw "property value is missing";
        }
        if (list != null && list != 'undefined' && list != "null") {

            var IsPropertyExists = false;
            var IsPropertyValueExists = false;

            for (var i = 0; i < list.length; i++) {

                if (list[i] != null) {

                    for (var prop in list[i]) {

                        if (prop == propertyKey) {

                            IsPropertyExists = true;

                            if (caseInsensitive){

                                list[i][prop] = list[i][prop].toLowerCase();
                                propertyValue = propertyValue.toLowerCase();

                            }
                            if (list[i][prop].indexOf(propertyValue) >= 0) {

                                IsPropertyValueExists = true;

                                this.Result.push(list[i]);
                            }
                        }
                    }
                }
            }

            if (!IsPropertyExists) {
                throw "property " + propertyKey + " doesn't exists!"
            }
            if (!IsPropertyValueExists) {
                throw "property doesn't contain value " + propertyValue;
            }
        }
        return this.Result;
    }
    
    function getitemByPropertyValue(list, propertyKey, propertyValue) {
        this.Result = null;
        if (propertyKey == null || propertyKey == 'undefined' || propertyKey == '') {
            throw "property is missing";
        }
        if (propertyValue == null || propertyValue == 'undefined' || propertyValue == '') {
            throw "property value is missing";
        }
        if (list != null && list != 'undefined' && list != "null") {

            var IsPropertyExists = false;
            var IsPropertyValueExists = false;

            for (var i = 0; i < list.length; i++) {

                if (list[i] != null) {

                    for (var prop in list[i]) {

                        if (prop == propertyKey) {

                            IsPropertyExists = true;

                            if (list[i][prop] == propertyValue) {

                                IsPropertyValueExists = true;

                                this.Result = list[i];
                            }
                            break;
                        }
                    }
                }
            }

            if (!IsPropertyExists) {
                throw "property " + propertyKey+ " doesn't exists!"
            }
            if (!IsPropertyValueExists) {
                throw "property value " + propertyValue + " doesn't exists!"
            }
        }
        return this.Result;
    }
    
    function JSONToArray(list) {

        if (list.constructor === arrayConstructor) {
            return list;
        }
        else if (list.constructor === objectConstructor) {
            return JSON.parse(list);
        }
    }

    function ARRAYToJSON(list) {

        if (list.constructor === arrayConstructor) {
            if (list.length > 0) {
              
                if (list[0].constructor != objectConstructor) {
                     return JSON.stringify(list);
                }
                else {
                    return (list);
                }
            }
        }
        else if (list.constructor === objectConstructor) {
            return (list);
        }
    }

    function InsertItem(list, item) {

        if (list == null || list == 'undefined' || list == "") {
            list = {};
        }
        
        if (item != null) {

            if (item.constructor === arrayConstructor) {
                list = JSONToArray(list);

            }
            if (item.constructor === objectConstructor) {
               
                list = ARRAYToJSON(list);
            }

                for (var i = 0; i < list.length; i++) {
                    if (list[i] != null) {

                        for (var itemprop in item) {

                            var doesExist = false;

                            for (var prop in list[i]) {
                                if (itemprop == prop) {
                                    doesExist = true;
                                }
                            }

                            if (!doesExist) {
                                throw "" + itemprop + " property doesn't exists in list";
                            }
                        }
                    }
                    break;
                }

                list.push(item);
        }
        return list;
    }
    
    function UpdateItem(list, item, uniqueKey) {

        if (uniqueKey == null || uniqueKey == 'undefined' || uniqueKey == '') {
            throw "uniqueKey is missing";
        }

        if (list != null && list != 'undefined' && list != "null") {

            var IsPropertyExists = false;
            var IsPropertyValueExists = false;

            for (var itemprop in item) {

                if (itemprop == uniqueKey) {

                    for (var i = 0; i < list.length; i++) {

                        if (list[i] != null) {

                            for (var prop in list[i]) {

                                if (prop == uniqueKey) {

                                    if (list[i][prop] == item[itemprop]) {
                                        list[i] = item;
                                        return list;
                                    }
                                }
                            }
                        }
                    }
                }
            }
        }
    }

    function DeleteItem(list, item, uniqueKey) {
        if (uniqueKey == null || uniqueKey == 'undefined' || uniqueKey == '') {
            throw "uniqueKey is missing";
        }

        if (list != null && list != 'undefined' && list != "null") {

            var IsPropertyExists = false;
            var IsPropertyValueExists = false;

            for (var itemprop in item) {

                if (itemprop == uniqueKey) {

                    for (var i = 0; i < list.length; i++) {

                        if (list[i] != null) {

                            for (var prop in list[i]) {

                                if (prop == uniqueKey) {

                                    if (list[i][prop] == item[itemprop]) {
                                        list.splice(i, 1);
                                        return list;
                                    }
                                }
                            }
                        }
                    }
                }
            }
        }
    }

    function SortList(list, propertyKey, OrderDescByValue=false) {
 

        if (propertyKey == null || propertyKey == 'undefined' || propertyKey == '') {
            throw "property is missing";
        }

        if (list != null && list != 'undefined' && list != "null") {

            list = list.sort(function (a, b) {
                var x = a[propertyKey]; var y = b[propertyKey];
                return ((x < y) ? -1 : ((x > y) ? 1 : 0));
            });
        }

        if (OrderDescByValue && list!=null) {
            list.reverse();
        }
        return list;
    }


}

var Result = new squel().getItem([{ username: "Jim", password: "JimPass" }, { username: "Adam", password: "AdamPass" }, { username: "Rich", password: "RichPass" }], "password", "RichPass");
console.log(Result);
Result = new squel().getItemContains([{ username: "Jim", password: "JimPass" }, { username: "Adam", password: "AdamPass" }, { username: "Rich", password: "RichPass" }], "password", "JIM",true);
console.log(Result);


Result = new squel().Insert([{ username: "Jim", password: "JimPass" }, { username: "Adam", password: "AdamPass" }, { username: "Rich", password: "RichPass" }], { username: "Michael", password: "MichaelPass" });
Result = new squel().getItemContains(Result, "password", "M", false);
console.log(Result);

Result = new squel().Sort(Result, "username", true);
console.log(Result);
Result = new squel().Delete(Result, Result[3], "username");
console.log(Result);

