var domain = window.location.host.split(".");
var tempArr = [];

var CONFIG = function () {
    let env = "dev";
    let CONFIGS = {
        dev: {
            host: "http://localhost/",
            baseUrl: "quiz/public/",
        },

        test: {
            host: 'https://staging.QUIZ.me',
            baseUrl: '/',
        },

        demo: {
            host: 'http://demo.QUIZ.me',
            baseUrl: '/',    
        },

        prod: {
            host: ((domain.length == 3)? `https://${domain[0]}.${domain[1]}.me`: `https://${window.location.host}`),
            baseUrl: '/',    
        }
    };

    setEnv = function (e) {
        if ($.inArray(e, ["dev", "test", "prod", "demo"]) == -1) {
            return console.error("Enviroment must be dev, test, demo or prod.");
        }
        env = e;
    };

    getConfig = function () {
        return CONFIGS[env];
    };

    return {
        setEnv: setEnv,
        CONFIG: getConfig,
    };
};

var config = new CONFIG();
// config.setEnv("dev");
// config.setEnv('test')
// config.setEnv('demo')
config.setEnv("prod");
config = config.CONFIG();

var QUIZ = {
    baseUrl: config.baseUrl,

    loader: {
        show: () => { $("#preloader").css('display', 'flex') },
        hide: () => { $("#preloader").css('display', 'none');$("#preloader").removeClass('d-flex') },
    },

    ajax: (prop, cb, loader = true) => {
        if (loader) {
            QUIZ.loader.show();
        }
        $.ajax(
            {
                url: prop.baseUrl || config.host + config.baseUrl + prop.url,
                method: prop.method,
                data: prop.data,
                success: (result, status, xhr) => {
                    const contentType =
                        xhr.getResponseHeader("content-type") || "";
                    if (
                        contentType &&
                        contentType.indexOf("application/json") !== -1
                    ) {
                        cb(result);
                    } else {
                        // window.location.reload();
                    }
                    if (!prop.hasOwnProperty("loader")) {
                        QUIZ.loader.hide();
                    }
                },
                error: (xhr, status, errors) => {
                    $.each(xhr.responseJSON.errors, (attr, error) => {
                        let cont = $("[name='" + attr + "']");
                        if (cont.next(".text-danger").length) {
                            cont.next(".text-danger").remove();
                        }
                        $(
                            '<span class="text-danger d-block">' +
                                error[0] +
                                "</span>"
                        ).insertAfter(cont);
                    });
                    if (!prop.hasOwnProperty("loader")) {
                        QUIZ.loader.hide();
                    }
                },
            },
            (res) => {
                if (!prop.hasOwnProperty("loader")) {
                    QUIZ.loader.hide();
                }
            }
        );
    },

    findDuplicates: (arr) =>
        arr.filter((item, index) => arr.indexOf(item) != index),

    getCookie: (name) => {
        var v = document.cookie.match("(^|;) ?" + name + "=([^;]*)(;|$)");
        return v ? v[2] : null;
    },

    setCookie: (name, value, days = 365) => {
        var d = new Date();
        d.setTime(d.getTime() + 24 * 60 * 60 * 1000 * days);
        document.cookie =
            name + "=" + value + ";path=/;expires=" + d.toGMTString();
    },

    stripHtml: (html) => {
        var tmp = document.createElement("DIV");
        tmp.innerHTML = html;
        return tmp.textContent || tmp.innerText || "";
    },

    deleteCookie: (name) => setCookie(name, "", -1),

    error: (mesg, ele) => {
        $(".text-danger").remove();
        $('<span class="d-block text-danger text-center font-weight-normal">' + mesg + "</span>").insertAfter(
            ele
        );
        sound.play(sound.error)
    },

    pad: (number, digits) => {
        n = Array(Math.max(digits - String(number).length + 1, 0)).join(0) + number;
        if (isNaN(n)) {
            return "00"
        }
        return n
    },

    sleep: (ms) => {
        return new Promise(resolve => setTimeout(resolve, ms));
    },

    sort: (parentSel) => {
        var table, rows, switching, i, x, y, shouldSwitch;
        table = parentSel[0];
        switching = true;

        while (switching) {
            switching = false;
            rows = table.children;

            for (i = 0; i < rows.length; i++) {
                shouldSwitch = false;
                if (rows[i+1] && parseInt(rows[i].dataset.order) > parseInt(rows[i+1].dataset.order)) {
                    shouldSwitch = true;
                    break;
                }
            }

            if (shouldSwitch) {
                rows[i].parentNode.insertBefore(rows[i + 1], rows[i]);
                switching = true;
            }
        }
    },

    disableLink: (link) => {
        link.parentElement.classList.add("isDisabled");
        // 2. Store href so we can add it later
        link.setAttribute("data-href", link.href);
        // 3. Remove href
        link.href = "";
        // 4. Set aria-disabled to 'true'
        link.setAttribute("aria-disabled", "true");
    },

    enableLink: (link) => {
        // 1. Remove 'isDisabled' class from parent span
        link.parentElement.classList.remove("isDisabled");
        // 2. Set href
        link.href = link.getAttribute("data-href");
        // 3. Remove 'aria-disabled', better than setting to false
        link.removeAttribute("aria-disabled");
    },

    fixHover: (el, fn) => {
        var par = el.parentNode;
        var next = el.nextSibling;
        par.removeChild(el);
        setTimeout(function () {
            par.insertBefore(el, next);
            if (fn) {
                fn();
            }
        }, 0);
    },

    isSafari: () => {
        var ua = navigator.userAgent.toLowerCase(); 
        if (ua.indexOf('safari') != -1) { 
            if (ua.indexOf('chrome') > -1) {
                return false
            } else {
                return true
                // Safari
            }
        }
    },

    random: (min, max) => {
        return Math.floor(Math.random() * (max - min + 1) ) + min
    },

    getUniqueRandom: () => {
        if (Array.isArray(tempArr)) {
            item = tempArr[QUIZ.random(0, tempArr.length - 1)]
            tempArr.splice(tempArr.indexOf(item), 1)
            return item
        }
        item = tempArr[Object.keys(tempArr)[QUIZ.random(0, Object.keys(tempArr).length - 1)]]
        delete tempArr["que"+item.id]
        return item
    },

    scrollTo: (el, h = 50) => {
        // Scroll top
        $('html, body').animate({
            scrollTop: el.offset().top - h
        }, 500);
    },

    href: () => {
        $('[data-href]').off('click')
        $('[data-href]').click(function(e) {
            e.preventDefault()
            window.location.href = $(this).data('href')
        })
    }
};

Object.filter = function (obj, predicate) {
    var result = {},
        key;

    for (key in obj) {
        if (obj.hasOwnProperty(key) && !predicate(obj[key])) {
            result[key] = obj[key];
        }
    }

    return result;
};

Object.toArray = function (obj) {
    if (typeof obj == 'array') {
        return obj
    }
    return Object.keys(obj).map( (key, i, arr) => {
        return obj[key] = obj.key
    });
};

history.pushState(null, null, location.href);
window.onpopstate = function () {
    history.pushState(null, document.title, location.href);
    history.go(1);
};

$('.footer').click().click()
QUIZ.href()

$.fn.extend({ 

    addTempClass: function(className, duration) {
        var elements = this;
        setTimeout(function() {
            elements.removeClass(className);
        }, duration);

        return this.each(function() {
            $(this).addClass(className);
        });
    },

    removeTempClass: function(className, duration) {
        var elements = this;
        setTimeout(function() {
            elements.addClass(className);
        }, duration);

        return this.each(function() {
            $(this).removeClass(className);
        });
    }
});

if (typeof Object.assign !== 'function') {
    // Must be writable: true, enumerable: false, configurable: true
    Object.defineProperty(Object, "assign", {
      value: function assign(target, varArgs) { // .length of function is 2
        'use strict';
        if (target === null || target === undefined) {
          throw new TypeError('Cannot convert undefined or null to object');
        }
  
        var to = Object(target);
  
        for (var index = 1; index < arguments.length; index++) {
          var nextSource = arguments[index];
  
          if (nextSource !== null && nextSource !== undefined) {
            for (var nextKey in nextSource) {
              // Avoid bugs when hasOwnProperty is shadowed
              if (Object.prototype.hasOwnProperty.call(nextSource, nextKey)) {
                to[nextKey] = nextSource[nextKey];
              }
            }
          }
        }
        return to;
      },
      writable: true,
      configurable: true
    });
  }

Array.prototype.pluck = function(key) {
    return this.map(function(object) { return object[key]; });
};


document.querySelectorAll('img.svg').forEach(function(img){
    var imgID = img.id;
    var imgClass = img.className;
    var imgURL = img.src;

    fetch(imgURL).then(function(response) {
        return response.text();
    }).then(function(text){

        var parser = new DOMParser();
        var xmlDoc = parser.parseFromString(text, "text/xml");

        // Get the SVG tag, ignore the rest
        var svg = xmlDoc.getElementsByTagName('svg')[0];

        // Add replaced image's ID to the new SVG
        if(typeof imgID !== 'undefined') {
            svg.setAttribute('id', imgID);
        }
        // Add replaced image's classes to the new SVG
        if(typeof imgClass !== 'undefined') {
            svg.setAttribute('class', imgClass+' replaced-svg');
        }

        // Remove any invalid XML tags as per http://validator.w3.org
        svg.removeAttribute('xmlns:a');

        // Check if the viewport is set, if the viewport is not set the SVG wont't scale.
        if(!svg.getAttribute('viewBox') && svg.getAttribute('height') && svg.getAttribute('width')) {
            svg.setAttribute('viewBox', '0 0 ' + svg.getAttribute('height') + ' ' + svg.getAttribute('width'))
        }

        // Replace image with new SVG
        img.parentNode.replaceChild(svg, img);
    });

});