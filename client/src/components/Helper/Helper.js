import moment from 'moment';

function parseCompaniesJSON(companiesList, selectedDate) {
    let selectedCompanies = [];

    for(let i = 0; i < companiesList.length; i++) {
        let obj = companiesList[i];
        // https://momentjs.com/docs/#/query/is-same/
        if(moment(selectedDate).isSame(obj.registrationDate, 'day')) {
            selectedCompanies.push(obj);
        }
    }

    return selectedCompanies;
}

const Helper = { parseCompaniesJSON };
export default Helper;
