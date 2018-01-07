import axios from 'axios';


let util = {

};
util.title = function(title) {
    title = title || 'iView admin';
    window.document.title = title;
};




export default util;