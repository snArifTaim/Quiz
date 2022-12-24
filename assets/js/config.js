testNamespace = {
    gameTestIsEnterYourName: false,
    utm: '',
    utmIndex:0,
    lang: '',
    upfileTempUrl: '',  
    adUnitTestName: {
        'Home-970x90-1': ['3347712094','4458038813','970px','90px'],
        'Home-300x250-2': ['3111036235','5185276053','300px','250px'],
        'PC-Testname-Home-Disney-Bottom-Match-1': ['1437548832'],
        'Home-300x250-3': ['2126963912', '7376384725'],
        'Play-970x90-1': ['6301178491','2594717834','970px','90px'],
        'Play-336x280-2': ['5594601488','4642296678','336px','280px'],
        'Play-728x90-3': ['1943981143','7240539852','728px','90px'],
        'PC-Testname-Play-Long-728x90': ['1931449917'],
        'PC-Testname-Play-RightBottom-300x600': ['7344107434'],
        'Testing-970x90-1': ['5506971573','2330143890','970px','90px'],
        'Testing-300x250-2': ['8488358133','9989142066','300px','250px'],
        'Testing-336x280-3': ['9581947956','1289784147','336px','280px'],
        'Testing-728x90-4': ['1943981143','5117348514','728px','90px'],
        'Result-970x90-1': ['6302437675','6801556156','970px','90px'],
        'Result-336x280-2': ['9602979314','7115566715','336px','280px'],
        'Result-728x90-3': ['2742466618','1437548832','728px','90px'],
        'Result-728x90-4': ['2549635747','4167228922','728px','90px'],
        'PC-Testname-Result-RightBottom-300x600': ['8465617411'],
        'Search-300x250': ['2865330519', '6063303058'],
    },
    fbAdFoo: function (adname, width, height, num) {
        var tempclassname = adname      
        if (num != undefined) {
            tempclassname = adname+'-'+num
        }
        console.log(adname)
        if (height == 100) width = 320
        if (testNamespace.adUnitTestName[adname][testNamespace.utmIndex] == '') return false
        var adtishitext = 'ADVERTISMENT'
        if ($('.temp_swiper_ad_box').length > 1) return false
        $('.'+tempclassname).append($(`
        <div class="divLinePa"><div class="divLine"></div><span>${adtishitext}</span></div>  
        <div class="common_list-li" style="text-align: center;">
            <ins class="adsbygoogle"
            style="display:inline-block;width:${width}px;height:${height}px"
            data-ad-client="ca-pub-3961823097646209"
            data-ad-slot="${testNamespace.adUnitTestName[adname][testNamespace.utmIndex]}"></ins>
            <script>
                (adsbygoogle = window.adsbygoogle || []).push({});
            </script>
        </div>`))  
    },
    nextConfig: {
        fr: 'prochain >',
        es: 'siguiente >',
        pt: 'PrÃ³ximo >',
        id: 'berikutnya >',
        th: 'à¸•à¹ˆà¸­à¹„à¸› >',
        tr: 'Sonraki >',
        en: 'NEXT >',
        ar: "> Ø§Ù„ØªØ§Ù„Ù‰"
    },
    descLoginConfig: {
    	en:'Calculating your result',
        tr:'SonuÃ§ hesaplanÄ±yor',
        id:'Dalam proses',
        th:'à¸à¸³à¸¥à¸±à¸‡à¸›à¸£à¸°à¹€à¸¡à¸´à¸™à¸œà¸¥',
        es:'Calculando tu resultado',
        pt:'Calculando seu resultado'
    },
    loginForFaceBook: function(lan, id, value) {
        location.href = 'https://www.facebook.com/v2.12/dialog/oauth?&client_id=2012870925633076&redirect_uri=https://www.quizmee.me/fbCallback&state={language=' + lan + ',val=' + value + ',id=' + id + ',neworold=1}&scope=public_profile';
    },
    testModule: (function(){
        var module={
            language: '',
            lid: '',
            start:function(lan, id){
                window.score=0;
                console.log(lan, id,module)
                module.language = lan;
                module.lid = id;
                $('#panel-start,#panel-answer').hide();
                module.next(1);
                $('#panel-testbox').show();
            },
            // next:function(num,obj){
            //     if(!num){
            //         num=1;
            //     }

            //     //Jump type test check
            //     if(num.toString().indexOf('#')>-1){
            //         window.score=num.replace('#','');
            //         module.showResult();
            //         return;
            //     }

            //     //Set the score
            //     if(obj){
            //         var _score=parseInt($(obj).attr('score'));
            //         window.score+=_score;
            //     }

            //     //Last question ,then show result
            //     var quesLen=testNamespace.testConfig.questionlist.length;
            //     if(num>quesLen){
            //         //If the last question,show answer
            //         module.showResult();
            //         return;
            //     } else {
            //         console.log($(obj))
            //         setTimeout(function() {
            //             $(obj).css({
            //                 'background': '#FF5692',
            //                 'color': '#fff',
            //                 'border': 'none'
            //             })
            //         }, 1000)
            //     }
            //     setTimeout(function() {

            //     }, 1000)
            //     var ques=testNamespace.testConfig.questionlist[num-1],
            //         type=testNamespace.testConfig.sort,
            //         option=ques['option'];

            //     //Set question title
            //     var quesBox=$('#option-question>h3'),
            //         optionBox=$('#option-box'),
            //         str='';
            //     str+='<table cellpadding="0" cellspacing="0">';
            //     if(ques.image){
            //         str+='<img src="'+ques.image+'">';
            //     }

            //     quesBox.text((quesLen>1?num+'ã€':'  ')+ques.title);

            //     //Set question options
            //     for(i=0,len=option.length;i<len;i++){
            //         var data=option[i],
            //             _score=data[1],
            //             jump=type=='jump'?data[1]:'';

            //         var _next=jump?jump:parseInt(num)+1,
            //             _click="testNamespace.testModule.next('"+_next+"',this)";
            //             if ($('.question-main-fb-btn').data('ismusic') == 1) {
            //                 str+='<tr><td><input id="option'+i+'" onclick="'+_click+'" score="'+_score+'" name="list" type="radio" value="0"><audio src="/Uploads/local/'+ data[0] +'" controls="controls">Your browser does not support the audio element.</audio></td></tr>';
            //             } else {
            //                 str+='<tr><td><input id="option'+i+'" onclick="'+_click+'" score="'+_score+'" name="list" type="radio" value="0"><label for="option'+i+'">'+data[0]+'</label></td></tr>';
            //             }
            //     }
            //     str+='</table>';
            //     optionBox.html(str);
            //     var audios = document.getElementsByTagName("audio");                           
            //     // æš‚åœå‡½æ•°
            //     function pauseAll() {
            //     Â Â Â Â var self = this;
            //     Â Â Â Â [].forEach.call(audios, function (i) {
            //     Â Â Â Â Â Â Â Â // å°†audiosä¸­å…¶ä»–çš„audioå…¨éƒ¨æš‚åœ
            //     Â Â Â Â Â Â Â Â i !== self && i.pause();
            //     Â Â Â Â })
            //     }
            //     // ç»™playäº‹ä»¶ç»‘å®šæš‚åœå‡½æ•°
            //     [].forEach.call(audios, function (i) {
            //     Â Â Â Â i.addEventListener("play", pauseAll.bind(i));
            //     })
            // },
            next:function(num,obj){
                if(!num){
                    num=1;
                }

                //Jump type test check
                if(num.toString().indexOf('#')>-1){
                    window.score=num.replace('#','');
                    $(obj).next().css({
                        'background': '#FF5692',
                        'color': '#fff',
                        'border': 'none'
                    })  
                    // if (location.href.indexOf('test.testname')>-1) {
                        setTimeout(() => {
                            if ($('.tempSelect_facebook_login').length>0){
                                $('.isselectquestion').hide().attr('resulturl', "/"+module.language+"/results/"+module.lid+'/rid/'+$(obj).parent().parent().index())
                                $('.tempSelect_facebook_login').removeClass('tempSelect_facebook_login')
                            } else {
                                module.showResult(obj);
                            }
                        },1000)
                    // } else {
                    //     module.showResult(obj);
                    // }
                    return;
                }

                //Set the score
                if(obj){
                    var _score=parseInt($(obj).attr('score'));
                    window.score+=_score;
                }

                //Last question ,then show result
                var quesLen=testNamespace.testConfig.questionlist.length
                
                if(num>quesLen){
                    //If the last question,show answer      
                    $(obj).next().css({
                        'background': '#FF5692',
                        'color': '#fff',
                        'border': 'none'
                    })        
                    console.log(obj)  
                    // if (location.href.indexOf('test.testname')>-1) {
                        setTimeout(() => {
                            if ($('.tempSelect_facebook_login').length>0){
                                $('.isselectquestion').hide().attr('resulturl', "/"+module.language+"/results/"+module.lid+'/rid/'+$(obj).parent().parent().index())
                                $('.tempSelect_facebook_login').removeClass('tempSelect_facebook_login')
                            } else {
                                module.showResult(obj);
                            }
                          
                        },1000)
                    // }  else {
                    //     module.showResult(obj);
                    // }

                    return;
                }

                if (num>1) {     
                    $(obj).next().css({
                        'background': '#FF5692',
                        'color': '#fff',
                        'border': 'none'
                    })                 
                    setTimeout(() => {
                        $($('.selectquiz_count_box_line')[num-1]).addClass('selectquiz_count_box_line_select').siblings().removeClass('selectquiz_count_box_line_select')
                        tempfoo()
                    },1000)
                } else {
                    tempfoo()
                }

                function tempfoo () {
                      
                    var ques=testNamespace.testConfig.questionlist[num-1],
                    type=testNamespace.testConfig.sort,
                    option=ques['option'];

                    //Set question title
                    var quesBox=$('#option-question>h3'),
                        optionBox=$('#option-box'),
                        str='';
                    str+='<table cellpadding="0" cellspacing="0">';
                    if(ques.image){
                        str+='<img src="'+ques.image+'">';
                    }

                    quesBox.text((quesLen>1?num+'ã€':'  ')+ques.title);

                    //Set question options
                    for(i=0,len=option.length;i<len;i++){
                        var data=option[i],
                            _score=data[1],
                            jump=type=='jump'?data[1]:'';

                        var _next=jump?jump:parseInt(num)+1,
                            _click="testNamespace.testModule.next('"+_next+"',this)";
                            if ($('.question-main-fb-btn').data('ismusic') == 1) {
                                str+='<tr><td><input id="option'+i+'" onclick="'+_click+'" score="'+_score+'" name="list" type="radio" value="0"><audio src="/Uploads/local/'+ data[0] +'" controls="controls">Your browser does not support the audio element.</audio></td></tr>';
                            } else {
                                str+='<tr><td><input id="option'+i+'" onclick="'+_click+'" score="'+_score+'" name="list" type="radio" value="0"><label for="option'+i+'">'+data[0]+'</label></td></tr>';
                            }
                    }
                    str+='</table>';
                    optionBox.html(str);
                    var audios = document.getElementsByTagName("audio");                           
                    // æš‚åœå‡½æ•°
                    function pauseAll() {
                    Â Â Â Â var self = this;
                    Â Â Â Â [].forEach.call(audios, function (i) {
                    Â Â Â Â Â Â Â Â // å°†audiosä¸­å…¶ä»–çš„audioå…¨éƒ¨æš‚åœ
                    Â Â Â Â Â Â Â Â i !== self && i.pause();
                    Â Â Â Â })
                    }
                    // ç»™playäº‹ä»¶ç»‘å®šæš‚åœå‡½æ•°
                    [].forEach.call(audios, function (i) {
                    Â Â Â Â i.addEventListener("play", pauseAll.bind(i));
                    })
                }
            },
            prev:function(){

            },

            showResult:function(){
                var answerList=testNamespace.testConfig.resultlist;
                var scoreBox=$('#answer-score'),
                    introBox=$('#answer-intro'),
                    answerIndex='';
                $('#option-box input').attr('onclick','');
                for(i=0,len=answerList.length;i<len;i++){
                    var data=answerList[i],
                        low=data[1][0],
                        high=data[1][1];

                    if(score==high&&high==low){
                        answerIndex=i;
                        break;
                    }else if(high!=''&&low!=''){
                        if(score>=low&&score<=high){
                            answerIndex=i;
                            break;
                        }
                    }else if(high!=''&&low==''){
                        if(score<=high){
                            answerIndex=i;
                            break;
                        }
                    }else if(high==''&&low!=''){
                        if(score>=low){
                            answerIndex=i;
                            break;
                        }
                    }
                }

                if(answerIndex===''){
                    console.log('oh no,can\'t get your score...');
                    return;
                }
                var position = $('body').data('position')
                var lang = $('body').data('lang')
                $.ajax({
                    url: '//wangmeng.online/setTestClickAmount',
                    type: 'GET',
                    data: {
                        qid: $('.question-main-pic > img').data('qid'),
                        lang: lang,
                        website: 'testname',
                        device: 'pc',
                        position: position,
                        country: navigator.language.split('-')[1] || navigator.language,
                        domain: window.location.href.split(".")[0].split("//")[1]
                    },
                    success: function (data) {
                        // console.log(data)
                    },
                    error: function (err) {
                        console.log(err)
                    }
                })
                var resultUrl="/"+module.language+"/results/"+module.lid;
                resultUrl+='/rid/'+answerIndex;
                if ($('.tempSelect_facebook_login').length>0){
                    $('.isselectquestion').hide().attr('resulturl', resultUrl)
                    $('.tempSelect_facebook_login').removeClass('tempSelect_facebook_login')
                } else {
                    $('.question-main-test').addClass('question-main-test-show')
                    $('.question-main-testing').removeClass('question-main-test-show')
                    $('.languageTpuploadingHide1').hide()
                    $(window).scrollTop(0)
                    setTimeout(function() {
                        location.href = resultUrl;
                    }, 2000)
                   
                }
                // if($('#loginForYourNameInput').val() == ''){
                //     if($('.calculating_result').data('uploadshow') == 1) {
                //         $('.question-main-tempLog>div').each(function() {
                //             if ($(this).hasClass('ads-ad')) {
                                
                //             } else if ($(this).hasClass('uploadLogInDiv')) {
            
                //             } else {
                //                 $(this).remove()
                //             }
                //         })  
                //         $('.uploadLogInH3').removeClass('uploadLogInDivHide')
                //         $('.uploadLogInDiv').removeClass('uploadLogInDivHide')                           
                //         testNamespace.upfileTempUrl = resultUrl
                //     } else { 
                //         $('.readyAfterLoading').removeClass('readyAfterLoading')
                //         $('.test-container_login').hide()
                //         $('.languageTpuploadingHide1').hide()
                //         $('.ques_top_ad').hide()
                //         $(window).scrollTop(0)
                //         if (testNamespace.logInType == 'google') {
                //             logInWithFacebook(resultUrl+'?login_mode=google&token='+testNamespace.tempIdToken, testNamespace.logInType) 
                //         } else if (testNamespace.logInType == 'twitter') {
                //             location.href = resultUrl + '?login_mode=twitter'
                //         } else {
                //             logInWithFacebook(resultUrl, testNamespace.logInType)
                //         }
                //     }
                // }else{
                //     // var enterName = $('#loginForYourNameInput').val();
                //     // if(testNamespace.utm != ""){
                //     //     resultUrl += testNamespace.utm+'&enterName='+enterName;
                //     // }else{
                //     //     resultUrl += '?enterName='+enterName;
                //     // }    
                //     if ($('.tempSelect_facebook_login').length>0){
                //         $('.isselectquestion').hide().attr('resulturl', resultUrl)
                //         $('.tempSelect_facebook_login').removeClass('tempSelect_facebook_login')
                //     } else {
                //         location.href = resultUrl;
                //     }
                // }

            }

        };

        return {
            start:module.start,
            next:module.next,
            prev:module.prev
        }
    })()


}
