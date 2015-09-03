tinymce.create('tinymce.plugins.shapefly', {
	/**
	 * Initializes the plugin, this will be executed after the plugin has been created.
	 * This call is done before the editor instance has finished it's initialization so use the onInit event
	 * of the editor instance to intercept that event.
	 *
	 * @param {tinymce.Editor} ed Editor instance that the plugin is initialized in.
	 * @param {string} url Absolute URL to where the plugin is located.
	 */
	init : function(ed) {
	  var idstr = (ed.editorId||ed.id);
	  //console.log(idstr);
	  var el = document.getElementById(idstr);
	  var sfplugin = shapefly.plugin(el, {url:'http://shapefly.com/editor',
	    finish: function(img) {
		  tinymce.execCommand('mceInsertContent',true, img);
		}
	  });
	  //ed.onInit.add(function(ed) {
	  ed.on('init', function(){
		sfplugin.initEditTag(ed.dom.doc.body);
	  });
	  // Add a button that opens a window
	  ed.addButton('shapefly', {
	    tooltip:'Insert ready-made shapes,such as rectangles and circles, arrows, lines, flowchart symbols, and callouts.',
		text: 'Shapefly',
		icon: 'shapefly',
		//image : '//localhost/favicon.ico',
		onclick: function() {
		  var content = ed.selection.getContent();
		  var uuid = null;
		  if(content!=='') {
		    var tmp = document.createElement('div');
			tmp.innerHTML = content;
			var img = tmp.childNodes[0];
			uuid = img.getAttribute('data-sf-uuid');
			console.log(uuid);
		  }
		  sfplugin.open(uuid);
		}
	  });
	},

	/**
	 * Creates control instances based in the incomming name. This method is normally not
	 * needed since the addButton method of the tinymce.Editor class is a more easy way of adding buttons
	 * but you sometimes need to create more complex controls like listboxes, split buttons etc then this
	 * method can be used to create those.
	 *
	 * @param {String} n Name of the control to create.
	 * @param {tinymce.ControlManager} cm Control manager to use inorder to create new control.
	 * @return {tinymce.ui.Control} New control instance or null if no control was created.
	 */
	createControl : function() {
		return null;
	},

	/**
	 * Returns information about the plugin as a name/value array.
	 * The current keys are longname, author, authorurl, infourl and version.
	 *
	 * @return {Object} Name/value array containing information about the plugin.
	 */
	getInfo : function() {
		return {
			longname : 'Insert ready-made shapes,such as rectangles and circles, arrows, lines, flowchart symbols, and callouts.',
			author : 'zzzhan',
			authorurl : 'http://github.com/zzzhan',
			infourl : 'http://github.com/zzzhan/tinymce-plugin-shapefly',
			version : "0.1.0"
		};
	}
}); 
// Register plugin
tinymce.PluginManager.add('shapefly', tinymce.plugins.shapefly);