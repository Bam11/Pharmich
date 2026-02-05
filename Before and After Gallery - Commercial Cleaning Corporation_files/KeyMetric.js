// Copyright 2024 v24.0802 - KeyMetric, Inc. 
var km_DT = new Date();
var km_CurSec = Math.round(km_DT.getTime()/1000);
kmnums = [];
var km_Acct = '17133';
var tua = 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/128.0.0.0 Safari/537.36';
function km_GVn(s,n,d) { s+=d; var i = s.indexOf(n+'='); if (i!=-1) { s = s.substring(i)+d; s = s.substring(s.indexOf('=')+1,s.indexOf(d)); } else { s = ''; } return s; }
function km_GC(n) { return km_GVn(decodeURI(document.cookie),n+km_Acct,';'); }
function km_GC2(n) { return km_GVn(document.cookie,n+km_Acct,';'); }
function km_GBD(d) { var bd; var reIP = /^((25[0-5]|2[0-4][0-9]|1[0-9][0-9]|[1-9][0-9]|[0-9])\.){3}(25[0-5]|2[0-4][0-9]|1[0-9][0-9]|[1-9][0-9]|[0-9])$/; if (reIP.exec(d)) { bd = d; } else { var da= d.split('.'); var dac = da.length; if (dac > 1) { bd = da[dac-2] + '.' + da[dac-1]; } else { bd = da[dac-1]; } } return bd; }
function km_GVi(s,i,d) {s = s.split(d)[i]; return (s)?s:'';}
function km_GVi2(s,i,d) {s = decodeURI(s.split(d)[i]); return (s)?s:'';}
function km_ge(i) { var ge = (document.getElementById)?true:false; var da = (document.all)?true:false; return (ge)?window.document.getElementById(i):((da)?window.document.all[i]:null); }
function km_gts(n,t) { var tel={}; tel['protocol'] = 'tel:'; tel['pathname'] = t; return km_cjs(tel);}
function km_cjs(obj) { var json = '{'; var start = 0; for(var item in obj) { if(start > 0){ json +=','; } json += '"'+item+'":"'+ encodeURIComponent(obj[item])+'"'; start++; } json += '}'; return json;}
function km_GUr(d,clientid)
{
 if ((!d) || (d=='')) { d='&'; }
 var lpr,lss,lqs,kmbd;
 var l = window.location;
 lqs = l.search.substring(1);
 lpr = l.protocol.substr(0,l.protocol.length-1);
 lss = (lpr == 'https')?1:0;
 kmbd = km_GBD(l.hostname);
 if (typeof(window['kmas']) == 'undefined') {
     var kmas = km_GVn(lqs,'kmas','&');
     kmas = (kmas)?kmas:'0';
     if (kmas==0) {
         if (lqs.indexOf('ovkey')!=-1) { kmas = '2'; }
         if (lqs.indexOf('ovmtc')!=-1) { kmas = '2'; }
         if (lqs.indexOf('gclid')!=-1) { kmas = '1'; }
         if (lqs.indexOf('msclkid')!=-1) { kmas = '3'; }
     }
 } else {
	var kmas = window['kmas'];
 }
 if (typeof kmca == 'undefined') {
     var kmca = km_GVn(lqs,'utm_campaign','&');
     kmca = (kmca)?kmca:'';
 }
 if (typeof kmag == 'undefined') {
     var kmag = km_GVn(lqs,'kmag','&');
     kmag = (kmag)?kmag:'';
 }
 if (typeof(window['kmc1']) == 'undefined') {
     var kmc1 = km_GVn(lqs,'kmc1','&');
     kmc1 = (kmc1)?kmc1:'';
 } else {
     var kmc1 = window['kmc1'];
 }
 if (typeof(window['kmc2']) == 'undefined') {
     var kmc2 = km_GVn(lqs,'kmc2','&');
     kmc2 = (kmc2)?kmc2:'';
 } else {
     var kmc2 = window['kmc2'];
 }
 if (typeof kmc3 == 'undefined') {
     var kmc3 = km_GVn(lqs,'kmc3','&');
     kmc3 = (kmc3)?kmc3:'';
 }
 if (typeof kmc4 == 'undefined') {
     var kmc4var = 'KMC4';
     var kmc4 = km_GVn(lqs,'kmc4var','&');
     kmc4 = (kmc4)?kmc4:'';
 }
 if (typeof kmc5 == 'undefined') {
     var kmc5var = 'gclid';
     if (kmc5var == 'gclid' && kmas == '3') { kmc5var = 'msclkid'; }
     var kmc5 = km_GVn(lqs,kmc5var,'&');
     kmc5 = (kmc5)?kmc5:'';
 }
 if (typeof kmkw == 'undefined') {
     var kmkw = km_GVn(lqs,'utm_term','&');
     kmkw = (kmkw)?kmkw:'';
     if (kmkw == '') {
         if (lqs.indexOf('ovkey') != -1) { kmkw = km_GVn(lqs,'ovkey','&'); }
     }
 }
 if (typeof kmmt == 'undefined') {
     var kmmt = km_GVn(lqs,'kmmt','&');
     kmmt = (kmmt)?kmmt:'';
     if (kmmt == '') {
         if (lqs.indexOf('ovmtc') != -1) {
             switch (km_GVn(lqs,'ovmtc','&')) {
                 case 'content': kmmt='c';  break;
                 case 'standard': kmmt='e'; break;
                 case 'advanced': kmmt='b'; break;
             }
         }
     }
 }
 if (typeof kmrq == 'undefined') {
     var kmrq = km_GVn(lqs,'kmrq','&');
     kmrq = (kmrq)?kmrq:'';
     if (kmrq == '') {
         if (lqs.indexOf('ovraw') != -1) { kmrq = km_GVn(lqs,'ovraw','&'); }
     }
 }
 var r,kmrh='',rqs='';
 r = document.referrer;
 if (r.length) {
     r += '?';
     var anc = document.createElement('a');
     anc.href = document.referrer;
     kmrh=anc.hostname;
     if (kmrh == window.location.hostname) { kmrh = ''; }
     rqs = r.substring(r.indexOf('?')+1);
     rqs = rqs.substring(0,rqs.indexOf('?')).toLowerCase();
 }
 var kmE = km_GC('kmE');
 var curd = Math.round(km_DT.getTime()/86400000);
 var vsq,lvd,hist,newL=false;
 if (kmE) {
	vsq = parseInt(km_GVi(kmE,0,':'));
	hist = km_GVi(kmE,1,':');
 }
 var kmL = km_GC2('km2L');
 newL = true;
 if (kmL === '') { kmL = km_GC('kmL'); newL = false; }
 var curd = Math.round(km_DT.getTime()/86400000);
 var Lkmas='', Lkmca='', Lkmag='', Lkmkw='', Lkmmt='', Lkmrh='', Lrqs='', Lkmc1='';
 if (kmL) {
	  vsq = parseInt(km_GVi(kmL,0,'|'));
	  Lkmas = km_GVi(kmL,1,'|');
   if (newL) {
	    Lkmca = km_GVi2(kmL,2,'|');
	    Lkmag = km_GVi2(kmL,3,'|');
	    Lkmkw = km_GVi2(kmL,4,'|');
	    Lkmmt = km_GVi2(kmL,5,'|');
	    Lkmrh = km_GVi2(kmL,6,'|');
	    Lrqs = km_GVi2(kmL,7,'|');
     Lkmc1 = km_GVi2(kmL,8,'|');
   } else {
	    Lkmca = km_GVi(kmL,2,'|');
	    Lkmag = km_GVi(kmL,3,'|');
	    Lkmkw = km_GVi(kmL,4,'|');
	    Lkmmt = km_GVi(kmL,5,'|');
	    Lkmrh = km_GVi(kmL,6,'|');
	    Lrqs = km_GVi(kmL,7,'|');
     Lkmc1 = km_GVi(kmL,8,'|');
   }
   console.log(kmas+','+Lkmas+','+kmrh+','+Lkmrh+','+km_Gvid()+','+km_GBD(kmrh)+','+km_GBD(kmbd));
   if (((kmas!='0')&&( !km_Gvid()||kmas!=Lkmas||(kmkw!=''&&kmkw!=Lkmkw)||(kmca!=''&&kmca!=Lkmca)||(kmag!=''&&kmag!=Lkmag) ))||( (kmas=='0')&&(kmrh!='')&&(kmrh!=Lkmrh)&&(km_GBD(kmrh)!=km_GBD(kmbd)) )      ) {
     console.log('vsq:'+vsq);
     vsq = (vsq)?vsq+1:1;
   }
   if (kmas == '0' && (kmrh == '' || km_GBD(kmrh)==km_GBD(kmbd))) {
	    kmas = Lkmas;
	    kmca = Lkmca;
	    kmag = Lkmag;
	    kmkw = Lkmkw;
	    kmmt = Lkmmt;
	    kmrh = Lkmrh;
	    rqs = Lrqs;
     kmc1 = Lkmc1;
   }
 } else {
   vsq = 1;
 }
 hist = (hist)?hist:'';
 var s = '';
 s+=d+'las='+kmas;
 s+=d+'lkw='+escape(kmkw);
 s+=d+'lmt='+kmmt;
 s+=d+'rho='+kmrh;
 s+=d+'rqu='+escape(kmrq);
 s+=d+'rqs='+escape(rqs);
 s+=d+'lca='+escape(kmca);
 s+=d+'lag='+escape(kmag);
 s+=d+'lc1='+escape(kmc1);
 s+=d+'lc2='+escape(kmc2);
 s+=d+'lc3='+escape(kmc3);
 s+=d+'lc4='+escape(kmc4);
 s+=d+'lc5='+escape(kmc5);
 s+=d+'lss='+lss;
 s+=d+'lho='+l.hostname;
 let safePath = l.pathname.includes('%3C') ? l.pathname.split('%3C')[0] : l.pathname;
 s+=d+'lpa='+safePath;
 s+=d+'lha='+l.hash.substring(1);
 s+=d+'vsq='+vsq;
 s+=d+'hist='+escape(hist);
 return s;
}
function km_GBr(acct,d)
{
 if ((!d) || (d=='')) { d='&'; }
 var km_getElementById   = (document.getElementById)?1:0;
//false
var cbd = km_GBD(window.location.hostname);
 document.cookie='kmCheck=d95377a6a6284b6a9b274eab3e54482e;path=/; SameSite=None; Secure;' + ((cbd)?'domain='+cbd:'');
 km_CookieSupport = escape(document.cookie.indexOf('kmCheck=d95377a6a6284b6a9b274eab3e54482e') == -1?0:1);
 km_cook = (navigator.cookieEnabled)?1:0;
 km_java = navigator.javaEnabled()?1:0;
 km_lang = (navigator.language)?navigator.language.toLowerCase():navigator.userLanguage;
 km_ScreenWidth = (screen.width)?screen.width:0;
 km_ScreenHeight = (screen.height)?screen.height:0;
 km_ScreenRes = km_ScreenWidth + 'x' + km_ScreenHeight;
 km_ColorDepth = (screen.colorDepth)?screen.colorDepth:screen.pixelDepth;
 var dt= new Date();
 var wo = new Date(dt.getFullYear(), 0, 1, 0, 0, 0, 0).getTimezoneOffset();
 var so = new Date(dt.getFullYear(), 6, 1, 0, 0, 0, 0).getTimezoneOffset();
 if (wo > so) { km_TimeZone = wo; } else { km_TimeZone = so; }
 var km_Flash = false;
 var km_FlashVersion = '0';
 if (navigator.plugins && navigator.plugins.length) {
     for (x=0; x < navigator.plugins.length; x++) {
         if (navigator.plugins[x].name.indexOf('Shockwave Flash') != -1) {
             km_FlashVersion = navigator.plugins[x].description.split('Shockwave Flash ')[1];
             km_Flash = true;
             break;
         }
     }
 }
 else if (window.ActiveXObject) {
     for (x = 2; x <= 20; x++) {
         try {
             oFlash = eval("new ActiveXObject('ShockwaveFlash.ShockwaveFlash." + x + "')");
             if(oFlash) {
                 km_Flash = true;
                 km_FlashVersion = x;
             }
         }
         catch(e) {}
     }
 }
 km_FlashVersion = parseInt(km_FlashVersion);
 var km_PluginSample = '';
 if (navigator.plugins && navigator.plugins.length) {
     for (np=0; np < navigator.plugins.length; np++) {
 	    km_PluginSample += navigator.plugins[np].name.substring(0,10) + '|';
     }
 }
 var s = '';
 s+=d+'bfv='+km_FlashVersion;
 s+=d+'bcs='+km_CookieSupport;
 s+=d+'coo='+km_cook;
 s+=d+'bje='+km_java;
 s+=d+'bla='+km_lang;
 s+=d+'bsr='+km_ScreenRes;
 s+=d+'bcd='+km_ColorDepth;
 s+=d+'btz='+km_TimeZone;
 s+=d+'bge='+km_getElementById;
 s+=d+'plg='+km_PluginSample;
 return s;
}
function km_Gvid() { 
 var ssid = km_GC('kmS');
 return ssid;
}
var KMurl = location.protocol + '//km17133.keymetric.net/';
var KMinc = 'KM2.js?x=1';
function km_ScanForNodes(n, regx, cb, ia) {
        if (n.nodeName) {
            if (n.nodeName.toUpperCase() != 'SCRIPT') {
                if (n.nodeName.toUpperCase() == 'IFRAME') {
                    if (n.name) {
                        try {
                            var oIframe = document.getElementById(n.name);
                            if (oIframe) {
                                var oDoc = (oIframe.contentWindow || oIframe.contentDocument);
                                if (oDoc.document) oDoc = oDoc.document;
                                if (oDoc.body) km_ScanForNodes(oDoc.body, regx, cb, ia);
                            }
                        }
                        catch (err) {
                        }
                    }
                }
                else
                {
                    if (n.nodeName.toUpperCase() == '#TEXT') {
                        if (n.nodeValue) {
                            if (regx.test(n.nodeValue)) {
                                cb(regx, n);
                            }
                        }
                    }
                    else
                    {
                        if (n.nodeName.toUpperCase() == 'A') {
                            if (ia) {
                                if (n.href) {
                                    if (regx.test(n.href)) {
                                        cb(regx, n, ia);
                                    }
                                }
                            }
                        }
                        if (n.nodeName.toUpperCase() != 'A' || ia) {
                            for (var i = 0; i < n.childNodes.length; i++) {
                                km_ScanForNodes(n.childNodes[i], regx, cb, ia);
                            }
                        }
                    }
                }
            }
        }
}
function km_FindNumbers(regx, n, ia) {
    if (ia && n.nodeName.toUpperCase() == 'A') {
        arr = n.href.split(regx);
    } else {
        arr = n.nodeValue.split(regx);
    }
    var num1 = arr[1];
    var num = num1.replace(regx, '$3$4$5$7$9$11$13$15$17$19');
    if (kmnums.indexOf(num) === -1) kmnums.push(num);
}
function km_atl(regx, n, ia) {
  try {
    if (n.nodeName.toUpperCase() == 'A') {
      arr = n.href.split(regx);
      n.setAttribute('onclick', 'km_scdt("' + arr[1].replace('tel','') + '",1);');
    } else {
      var content = n.nodeValue;
      arr = content.split(regx);
      var p = n.parentNode;
      if (p.classList.contains('kmxlink')) { return; }
      var spanTag = document.createElement('span');
      spanTag.appendChild(document.createTextNode(arr[1]));
      spanTag.setAttribute('class', 'kmxlink');
      spanTag.setAttribute('onclick', 'km_scdt("' + arr[1] + '",1); document.location = "tel:' + arr[1] + '";');
      var repl = spanTag.outerHTML;
      var newval = n.nodeValue.replace(regx, repl);
      p.innerHTML = newval;
    }
  }
  catch(err) {
  }
}
function km_LogData(ConversionCode,RevenueValue,Location) { 
    var url, d='&';
    if (typeof ConversionCode == 'undefined') ConversionCode='';
    if (typeof RevenueValue == 'undefined') RevenueValue=0.0;
    if (typeof Location == 'undefined') Location=0;
    url = KMurl+KMinc;
    url += d + 'vid=' + km_Gvid();
    url += d + 'lcc=' + ConversionCode;
    url += d + 'lcv=' + RevenueValue;
    url += d + 'cat=' + Location;
    url += d + 'rnd='+Math.random();
    url += km_GUr(d,'');
    url += km_GBr(d);
    var kmx2 = document.createElement('script'); kmx2.type = 'text/javascript';
    kmx2.src = url;
    kmx2.async=1;
    document.body.appendChild(kmx2);
}
function km_LogDataAndRedirect(href,ConversionCode,RevenueValue,Location) { 
	km_LogData(ConversionCode,RevenueValue,Location);
	setTimeout('document.location = "' + href + '"', 200);
}
function km2(clientid) {
    var kmx3 = document.createElement('script'); kmx3.type = 'text/javascript';
    kmx3.src = KMurl+KMinc+'&lcc=0&vid='+km_Gvid()+'&rnd='+Math.random()+km_GUr('&',clientid)+km_GBr('&');
    kmx3.async=1;
    document.body.appendChild(kmx3);
}
km2('');
function km_scdt(p,ct) {
    var url, d='&';
    if (!ct) ct = 1;
    url = KMurl+'kmmobile.js?';
    url += 'phone=' + encodeURIComponent(p);
    url += d + 'ctype=' + ct;
    url += d + 'rnd=EAAAAOLwVl7ff8bkzmGIDRmEo%2baBYLOSMzFBOsghmmSY5rybteQgrszzgTjYqQcMQOnKYw%3d%3d';
    url += d + 'vid=' + km_Gvid();
    var kmx7 = document.createElement('script'); kmx7.type = 'text/javascript';
    kmx7.src = url;
    kmx7.async=1;
    document.body.appendChild(kmx7);
}
function km_Depart() { 
    var url, d='&';
    url = KMurl+'KMD.js?kmid=17133';
    url += d + 'vid=' + km_Gvid();
    url += d + 'rnd='+Math.random();
    url += km_GUr(d,'');
    var kmx4 = document.createElement('script'); kmx4.type = 'text/javascript';
    kmx4.src = url;
    document.body.appendChild(kmx4);
}
window.onunload = function () { km_Depart(); }
