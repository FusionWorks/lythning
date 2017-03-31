define(function(require,exports,module){

function template(locals) {var pug_html = "", pug_mixins = {}, pug_interp;;var locals_for_with = (locals || {});(function (local, national, state) {pug_html = pug_html + "\u003Cdiv class=\"container\"\u003E\u003Cdiv class=\"row\"\u003E\u003Cdiv class=\"col-xs-12\"\u003E\u003Ch2\u003ESelect your representatives\u003C\u002Fh2\u003E\u003Ch3\u003ETo find the topics they are working on\u003C\u002Fh3\u003E\u003C\u002Fdiv\u003E\u003C\u002Fdiv\u003E\u003Cdiv class=\"row\"\u003E\u003Cdiv class=\"col-sm-8 col-sm-offset-2\"\u003E\u003Cul class=\"rep-list\"\u003E";
// iterate local
;(function(){
  var $$obj = local;
  if ('number' == typeof $$obj.length) {
      for (var pug_index0 = 0, $$l = $$obj.length; pug_index0 < $$l; pug_index0++) {
        var rep = $$obj[pug_index0];
pug_html = pug_html + "\u003Cli\u003E\u003Cinput" + (" type=\"checkbox\""+pug.attr("id", "rep-" + rep.id, true, false)+pug.attr("data-id", rep.id, true, false)) + "\u002F\u003E\u003Clabel" + (pug.attr("for", "rep-" + rep.id, true, false)) + "\u003E\u003Cspan\u003E" + (pug.escape(null == (pug_interp = rep.level) ? "" : pug_interp)) + "\u003C\u002Fspan\u003E\u003Cp\u003E" + (pug.escape(null == (pug_interp = rep.name) ? "" : pug_interp)) + " &mdash; " + (pug.escape(null == (pug_interp = rep.position) ? "" : pug_interp)) + "\u003C\u002Fp\u003E\u003C\u002Flabel\u003E\u003C\u002Fli\u003E";
      }
  } else {
    var $$l = 0;
    for (var pug_index0 in $$obj) {
      $$l++;
      var rep = $$obj[pug_index0];
pug_html = pug_html + "\u003Cli\u003E\u003Cinput" + (" type=\"checkbox\""+pug.attr("id", "rep-" + rep.id, true, false)+pug.attr("data-id", rep.id, true, false)) + "\u002F\u003E\u003Clabel" + (pug.attr("for", "rep-" + rep.id, true, false)) + "\u003E\u003Cspan\u003E" + (pug.escape(null == (pug_interp = rep.level) ? "" : pug_interp)) + "\u003C\u002Fspan\u003E\u003Cp\u003E" + (pug.escape(null == (pug_interp = rep.name) ? "" : pug_interp)) + " &mdash; " + (pug.escape(null == (pug_interp = rep.position) ? "" : pug_interp)) + "\u003C\u002Fp\u003E\u003C\u002Flabel\u003E\u003C\u002Fli\u003E";
    }
  }
}).call(this);

// iterate state
;(function(){
  var $$obj = state;
  if ('number' == typeof $$obj.length) {
      for (var pug_index1 = 0, $$l = $$obj.length; pug_index1 < $$l; pug_index1++) {
        var rep = $$obj[pug_index1];
pug_html = pug_html + "\u003Cli\u003E\u003Cinput" + (" type=\"checkbox\""+pug.attr("id", "rep-" + rep.id, true, false)+pug.attr("data-id", rep.id, true, false)) + "\u002F\u003E\u003Clabel" + (pug.attr("for", "rep-" + rep.id, true, false)) + "\u003E\u003Cspan\u003E" + (pug.escape(null == (pug_interp = rep.level) ? "" : pug_interp)) + "\u003C\u002Fspan\u003E\u003Cp\u003E" + (pug.escape(null == (pug_interp = rep.name) ? "" : pug_interp)) + " &mdash; " + (pug.escape(null == (pug_interp = rep.position) ? "" : pug_interp)) + "\u003C\u002Fp\u003E\u003C\u002Flabel\u003E\u003C\u002Fli\u003E";
      }
  } else {
    var $$l = 0;
    for (var pug_index1 in $$obj) {
      $$l++;
      var rep = $$obj[pug_index1];
pug_html = pug_html + "\u003Cli\u003E\u003Cinput" + (" type=\"checkbox\""+pug.attr("id", "rep-" + rep.id, true, false)+pug.attr("data-id", rep.id, true, false)) + "\u002F\u003E\u003Clabel" + (pug.attr("for", "rep-" + rep.id, true, false)) + "\u003E\u003Cspan\u003E" + (pug.escape(null == (pug_interp = rep.level) ? "" : pug_interp)) + "\u003C\u002Fspan\u003E\u003Cp\u003E" + (pug.escape(null == (pug_interp = rep.name) ? "" : pug_interp)) + " &mdash; " + (pug.escape(null == (pug_interp = rep.position) ? "" : pug_interp)) + "\u003C\u002Fp\u003E\u003C\u002Flabel\u003E\u003C\u002Fli\u003E";
    }
  }
}).call(this);

// iterate national
;(function(){
  var $$obj = national;
  if ('number' == typeof $$obj.length) {
      for (var pug_index2 = 0, $$l = $$obj.length; pug_index2 < $$l; pug_index2++) {
        var rep = $$obj[pug_index2];
pug_html = pug_html + "\u003Cli\u003E\u003Cinput" + (" type=\"checkbox\""+pug.attr("id", "rep-" + rep.id, true, false)+pug.attr("data-id", rep.id, true, false)) + "\u002F\u003E\u003Clabel" + (pug.attr("for", "rep-" + rep.id, true, false)) + "\u003E\u003Cspan\u003E" + (pug.escape(null == (pug_interp = rep.level) ? "" : pug_interp)) + "\u003C\u002Fspan\u003E\u003Cp\u003E" + (pug.escape(null == (pug_interp = rep.name) ? "" : pug_interp)) + " &mdash; " + (pug.escape(null == (pug_interp = rep.position) ? "" : pug_interp)) + "\u003C\u002Fp\u003E\u003C\u002Flabel\u003E\u003C\u002Fli\u003E";
      }
  } else {
    var $$l = 0;
    for (var pug_index2 in $$obj) {
      $$l++;
      var rep = $$obj[pug_index2];
pug_html = pug_html + "\u003Cli\u003E\u003Cinput" + (" type=\"checkbox\""+pug.attr("id", "rep-" + rep.id, true, false)+pug.attr("data-id", rep.id, true, false)) + "\u002F\u003E\u003Clabel" + (pug.attr("for", "rep-" + rep.id, true, false)) + "\u003E\u003Cspan\u003E" + (pug.escape(null == (pug_interp = rep.level) ? "" : pug_interp)) + "\u003C\u002Fspan\u003E\u003Cp\u003E" + (pug.escape(null == (pug_interp = rep.name) ? "" : pug_interp)) + " &mdash; " + (pug.escape(null == (pug_interp = rep.position) ? "" : pug_interp)) + "\u003C\u002Fp\u003E\u003C\u002Flabel\u003E\u003C\u002Fli\u003E";
    }
  }
}).call(this);

pug_html = pug_html + "\u003C\u002Ful\u003E\u003C\u002Fdiv\u003E\u003C\u002Fdiv\u003E\u003Cdiv class=\"row\"\u003E\u003Cdiv class=\"col-sm-8 col-sm-offset-2\"\u003E\u003Cbutton class=\"btn-next js-next\" type=\"button\"\u003ENext\u003C\u002Fbutton\u003E\u003Cp class=\"message js-message\"\u003E\u003C\u002Fp\u003E\u003C\u002Fdiv\u003E\u003C\u002Fdiv\u003E\u003C\u002Fdiv\u003E";}.call(this,"local" in locals_for_with?locals_for_with.local:typeof local!=="undefined"?local:undefined,"national" in locals_for_with?locals_for_with.national:typeof national!=="undefined"?national:undefined,"state" in locals_for_with?locals_for_with.state:typeof state!=="undefined"?state:undefined));;return pug_html;}
return template;

});
