/*
Author:Jimmy
Email :jimmy31071987@gmail.com
*/

/*
 * Author: Jimmy
 */
function squel() {

    this.getItem = getitemByPropertyValue;
    this.getItemContains = getItemContainsPropertyValue;
    
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
}

var Result = new squel().getItem([{ username: "Jim", password: "JimPass" }, { username: "Adam", password: "AdamPass" }, { username: "Rich", password: "RichPass" }], "password", "RichPass");
console.log(Result);
Result = new squel().getItemContains([{ username: "Jim", password: "JimPass" }, { username: "Adam", password: "AdamPass" }, { username: "Rich", password: "RichPass" }], "password", "JIM",true);
console.log(Result);

