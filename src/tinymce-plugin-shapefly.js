tinymce.create('tinymce.plugins.shapefly', {
	/**
	 * Initializes the plugin, this will be executed after the plugin has been created.
	 * This call is done before the editor instance has finished it's initialization so use the onInit event
	 * of the editor instance to intercept that event.
	 *
	 * @param {tinymce.Editor} ed Editor instance that the plugin is initialized in.
	 * @param {string} url Absolute URL to where the plugin is located.
	 */
	init : function(ed, url) {
	  console.log(url);
	  var el = $('#'+(ed.editorId||ed.id));
	  var shapefly = el.shapefly({url:'//localhost/editor'});
	  shapefly.on('shapefly', function(event, img){
		tinymce.execCommand('mceInsertContent',true, img);
	  });
	  ed.onInit.add(function(ed) {
	    //console.debug(ed.dom);
	    var container = $(ed.dom.doc.body);
	    $('.shapefly-edit', container).remove();
	    el.shapefly('bindImgEvent', container);
	  });
	  // Add a button that opens a window
	  ed.addButton('shapefly', {
		text: 'Shapefly',
		image : 'http://static2.wikia.nocookie.net/__cb20090624134711/runescape/images/8/85/Smiley.svg',
		onclick: function(e) {
		  var content = ed.selection.getContent();
		  if(content!=='') {
		  var uuid = $(content).data('sf-uuid');
			//console.log(uuid);
			el.data('shapefly').uuid = uuid;
		  }
		  el.shapefly('open', e);
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
			longname : 'Shapefly Buttons',
			author : 'zzzhan',
			authorurl : 'http://github.com/zzzhan',
			infourl : 'http://github.com/zzzhan/tinymce-plugin-shapefly',
			version : "0.1.0"
		};
	}
}); 
// Register plugin
tinymce.PluginManager.add('shapefly', tinymce.plugins.shapefly);