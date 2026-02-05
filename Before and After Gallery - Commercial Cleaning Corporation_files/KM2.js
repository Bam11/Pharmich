// Copyright 2024 v24.0802 - KeyMetric, Inc. 
// 443
function km_GetTrackingURL(param) {
 var val;
 switch (param.toLowerCase()) {
     case 'adsource':
         val = 'Other Sources'; break;
     case 'kmas':
         val = '0'; break;
     case 'kmas':
         val = '0'; break;
     case 'utm_campaign':
         val = 'Campaign not provided'; break;
     case 'kmca':
         val = 'Campaign not provided'; break;
     case 'kmag':
         val = 'AdGroup not provided'; break;
     case 'kmag':
         val = 'AdGroup not provided'; break;
     case 'utm_term':
         val = 'Raw Query not available'; break;
     case 'kmkw':
         val = 'Raw Query not available'; break;
     case 'kmmt':
         val = 'unk'; break;
     case 'kmmt':
         val = 'unk'; break;
     case 'kmrq':
         val = 'Raw Query not available'; break;
     case 'kmrq':
         val = 'Raw Query not available'; break;
     case 'kmc1':
         val = 'N%2FA'; break;
     case 'kmc1':
         val = 'N%2FA'; break;
     case 'kmc2':
         val = 'N/A'; break;
     case 'kmc2':
         val = 'N/A'; break;
     case 'kmc3':
         val = 'N/A'; break;
     case 'kmc3':
         val = 'N/A'; break;
     case 'kmc4':
         val = 'N/A'; break;
     case 'kmc4':
         val = 'N/A'; break;
     case 'gclid':
         val = 'N/A'; break;
     case 'kmc5':
         val = 'N/A'; break;
     case 'kmrd':
         val = 'www.google.com'; break;
     case 'newvisit':
         val = 'true'; break;
     default:
         val = 'undefined';
 }
 return val;
}
var km_Acct = '17133';
var cbd = km_GBD(window.location.hostname);
cbd = ((cbd=='localhost')?'':cbd);
kmSessionDur = 30;
kmSes = new Date();
kmSes.setTime(kmSes.getTime() + 1000 * 60 * kmSessionDur);
document.cookie = 'kmS17133=0983499c0181430987950588dd9fc994;expires=' + kmSes.toGMTString() + ';path=/; Samesite=None; Secure;' + ((cbd)?'domain='+cbd:'');
kmCookieDays = 365;
kmExt = new Date();
kmExt.setTime(kmExt.getTime() + 1000 * 60 * 60 * 24 * kmCookieDays);
document.cookie = 'kmE17133=1:0|20160.;expires=' + kmExt.toGMTString() + ';path=/; Samesite=None; Secure;' + ((cbd)?'domain='+cbd:'');
kmLat = new Date();
kmLat.setTime(kmLat.getTime() + 1000 * 60 * 60 * 24 * kmCookieDays);
kmLatVal = '1|0|Campaign%20not%20provided|AdGroup%20not%20provided|Raw%20Query%20not%20available|unk|www.google.com|Raw%20Query%20not%20available|N%252FA';
document.cookie = 'km2L17133=' + kmLatVal + ';expires=' + kmLat.toGMTString() + ';path=/; Samesite=None; Secure;' + ((cbd)?'domain='+cbd:'');
function km_r(n,p,v) {
  if (n.nodeName) {
    if (n.nodeName.toUpperCase() != 'SCRIPT') {
        if (n.nodeName.toUpperCase() == 'IFRAME') {
            if (n.name) {
              try {
                var oIframe = document.getElementById(n.name);
                if (oIframe) {
                  var oDoc = (oIframe.contentWindow || oIframe.contentDocument);
                  if (oDoc.document) oDoc = oDoc.document;
                  if (oDoc.body) km_r(oDoc.body,p,v);
                }
              }
              catch(err) {
              }
            }
        }
        else if (n.nodeName.toUpperCase() == '#TEXT') {
            if (n.nodeValue) {
                var re = new RegExp(unescape(p).replace(/\+/g,' '),'gi');
                if (re.test(n.nodeValue)) {
                    n.nodeValue = n.nodeValue.replace(re,v);
                }
            }
        }
        else if (n.nodeName.toUpperCase() == 'A') {
            if (n.href.indexOf('tel') > -1) {
                var re_sp = new RegExp('[()\\\\ -.]+','g');
                var re_p = new RegExp(unescape(p));
                var re_pat = new RegExp(unescape(p).replace(re_sp,'[-]?'));
                var re_val = v.replace(re_sp,'');
                if (re_pat.test(n.href)) {
                    n.href = n.href.replace(re_pat,re_val);
                }
                if (re_p.test(n.href)) {
                    n.href = n.href.replace(re_p,re_val);
                }
            }
        }
        for (var i=0; i < n.childNodes.length; i++) {
            km_r(n.childNodes[i],p,v);
        }
    }
  }
}
function kmrpn(n,p,v) {
  if (n.nodeName) {
    if (n.nodeName.toUpperCase() != 'SCRIPT') {
        if (n.nodeName.toUpperCase() == 'IFRAME') {
            if (n.name) {
              try {
                var oIframe = document.getElementById(n.name);
                if (oIframe) {
                  var oDoc = (oIframe.contentWindow || oIframe.contentDocument);
                  if (oDoc.document) oDoc = oDoc.document;
                  if (oDoc.body) kmrpn(oDoc.body,p,v);
                }
              }
              catch(err) {
              }
            }
        }
        else if (n.nodeName.toUpperCase() == '#TEXT') {
            if (n.nodeValue) {
                if (p.test(n.nodeValue)) {
                    n.nodeValue = n.nodeValue.replace(p,v);
                }
            }
        }
        else if (n.nodeName.toUpperCase() == 'A') {
            if (n.href.substr(0,3).toLowerCase() == 'tel') {
                if (p.test(n.href)) {
                    n.href = n.href.replace(p,v);
                }
            }
        }
        for (var i=0; i < n.childNodes.length; i++) {
            kmrpn(n.childNodes[i],p,v);
        }
    }
  }
}
function km_GetContactCallback(cb,disp,cat,ctype) {
    km_GetContactInfo('callback',cat,cb,'','',disp,ctype);
}
function km_ReceiveCallback(response,cat,ctype) {
	//sample callback function
	//usage: km_GetContactCallback('km_ReceiveCallback',0,1);
}
function km_GetContactAuto(pat,disp,cat,ctype) {
}
function km_GetContactCustom(pat,disp,cat,ctype) {
    var re = new RegExp(unescape(pat),'gi');
    var re_sp = new RegExp('[()\\\\ -.]+','g');
    var re_tel = new RegExp(unescape(pat).replace(re_sp,'[-]?'),'g');
    if (re.test(document.body.innerHTML) || re_tel.test(document.body.innerHTML)) {
        km_GetContactInfo('auto',cat,'','',pat,disp,ctype);
    }
}
function km_GetContactInline(tgt,disp,cat,ctype) {
    km_GetContactInfo('inline',cat,'',tgt,'',disp,ctype);
}
function km_GetContactInfo(mode,cat,cb,tgt,pat,disp,ctype) {
    var url, d='&';
    if (!cat) cat = 0;
    if (!ctype) ctype = 1;
    url = KMurl+'KMGCnew.js?';
    url += 'mod=' + mode;
    url += d + 'cat=' + cat;
    url += d + 'cbk=' + escape(cb);
    url += d + 'tgt=' + tgt;
    url += d + 'pat=' + pat;
    url += d + 'disp=' + escape(disp);
    url += d + 'ctype=' + ctype;
    url += d + 'rnd=' + Math.random();
    url += d + 'vid=0983499c0181430987950588dd9fc994';
    var kmx5 = document.createElement('script'); kmx5.type = 'text/javascript';
    kmx5.src = url;
    kmx5.async=1;
    document.body.appendChild(kmx5);
}
function km_GetContactCheck(phone,ctype,final) {
    var url, d='&';
    if (!ctype) ctype = 1;
    url = KMurl+'KMGCcheck.js?';
    url += 'phone=' + encodeURIComponent(phone);
    url += d + 'ctype=' + ctype;
    url += d + 'rnd=' + Math.random();
    url += d + 'vid=0983499c0181430987950588dd9fc994';
    url += d + 'fnl=' + final;
    var kmx6 = document.createElement('script'); kmx6.type = 'text/javascript';
    kmx6.src = url;
    kmx6.async=1;
    document.body.appendChild(kmx6);
}
function km_onlyUnique(value, index, self) { return self.indexOf(value) === index; }
function km_PhoneReplaceAll() {
     var kmp = /((\+?1?-? ?[(]?)([6])([0])([9])([)]?[- .]?)([6])([-.]?)([9])([-.]?)([5])([- .]?)([6])([-.]?)([2])([-.]?)([5])([-.]?)([5]))/g;
     km_ScanForNodes(document.body, kmp, km_FindNumbers, 1);
     var nums = kmnums.length;
     kmnums.forEach((item, index) => {
         km_GetContactCheck(item, 1, (index == (nums-1) ? '1' : '')); 
     });
}
function winLoad(callback){    if (document.readyState === 'complete')    {        callback();    }    else    {        window.addEventListener('load', callback);    }}
winLoad(km_PhoneReplaceAll);
var mutationTarget = '';
if (typeof onKeyMetricReady == 'function') {
	onKeyMetricReady();
}
