!function(a,b){"use strict";a.extend(a.fn,{ccmconversation:function(b){return this.each(function(){var d=a(this),e=d.data("ccmconversation");e||d.data("ccmconversation",e=new c(d,b))})}});var c=function(a,b){this.publish("beforeInitializeConversation",{element:a,options:b}),this.init(a,b),this.publish("initializeConversation",{element:a,options:b})};c.fn=c.prototype={publish:function(a,c){c=c||{},c.CCMConversation=this,b.ConcreteEvent.publish(a,c)},init:function(c,d){var e=this;e.$element=c,e.options=a.extend({method:"ajax",paginate:!1,displayMode:"threaded",itemsPerPage:-1,activeUsers:[],uninitialized:!0},d);{var f=""!=e.options.posttoken?1:0,g=e.options.paginate?1:0,h=e.options.orderBy,i=e.options.enableOrdering,j=e.options.displayPostingForm,k=e.options.insertNewMessages,l=e.options.enableCommentRating,m=e.options.commentRatingUserID,n=e.options.commentRatingIP,o=e.options.addMessageLabel?e.options.addMessageLabel:"",p=e.options.dateFormat,q=e.options.customDateFormat,r=e.options.blockAreaHandle;e.options.maxFiles,e.options.MaxFileSize,e.options.fileExtensions}"ajax"==e.options.method?a.post(CCM_TOOLS_PATH+"/conversations/view_ajax",{cnvID:e.options.cnvID,cID:e.options.cID,blockID:e.options.blockID,enablePosting:f,itemsPerPage:e.options.itemsPerPage,addMessageLabel:o,paginate:g,displayMode:e.options.displayMode,orderBy:h,enableOrdering:i,displayPostingForm:j,insertNewMessages:k,enableCommentRating:l,commentRatingUserID:m,commentRatingIP:n,dateFormat:p,customDateFormat:q,blockAreaHandle:r},function(a){var c=b.obj;b.obj=e,e.$element.empty().append(a),b.obj=c,e.attachBindings(),e.publish("conversationLoaded")}):(e.attachBindings(),e.finishSetup(),e.publish("conversationLoaded"))},mentionList:function(b,c,d){var e=this;if(c){if(e.dropdown.parent.css({top:c.y,left:c.x}),0==b.length)return e.dropdown.handle.dropdown("toggle"),e.dropdown.parent.remove(),e.dropdown.active=!1,void(e.dropdown.activeItem=-1);e.dropdown.list.empty(),b.slice(0,20).map(function(b){var c=a("<li/>"),f=a("<a/>").appendTo(c).text(b.getName());f.click(function(){ConcreteEvent.fire("ConversationMentionSelect",{obj:e,item:b},d)}),c.appendTo(e.dropdown.list)}),e.dropdown.active||(e.dropdown.active=!0,e.dropdown.activeItem=-1,e.dropdown.parent.appendTo(e.$element),e.dropdown.handle.dropdown("toggle")),e.dropdown.activeItem>=0&&e.dropdown.list.children().eq(e.dropdown.activeItem).addClass("active")}},attachBindings:function(){var c=this;c.$element.unbind(".cnv"),c.options.uninitialized&&(c.options.uninitialized=!1,ConcreteEvent.bind("ConversationMention",function(a,b){c.mentionList(b.items,b.coordinates||!1,b.bindTo||c.$element.get(0))},c.$element.get(0)),c.dropdown={},c.dropdown.parent=a("<div/>").css({position:"absolute",height:0,width:0}),c.dropdown.active=!1,c.dropdown.handle=a("<a/>").appendTo(c.dropdown.parent),c.dropdown.list=a("<ul/>").addClass("dropdown-menu").appendTo(c.dropdown.parent),c.dropdown.handle.dropdown(),ConcreteEvent.bind("ConversationTextareaKeydownUp",function(){-1==c.dropdown.activeItem&&(c.dropdown.activeItem=c.dropdown.list.children().length),c.dropdown.activeItem-=1,c.dropdown.activeItem+=c.dropdown.list.children().length,c.dropdown.activeItem%=c.dropdown.list.children().length,c.dropdown.list.children().filter(".active").removeClass("active").end().eq(c.dropdown.activeItem).addClass("active")},c.$element.get(0)),ConcreteEvent.bind("ConversationTextareaKeydownDown",function(){c.dropdown.activeItem+=1,c.dropdown.activeItem+=c.dropdown.list.children().length,c.dropdown.activeItem%=c.dropdown.list.children().length,c.dropdown.list.children().filter(".active").removeClass("active").end().eq(c.dropdown.activeItem).addClass("active")},c.$element.get(0)),ConcreteEvent.bind("ConversationTextareaKeydownEnter",function(){c.dropdown.list.children().filter(".active").children("a").click()},c.$element.get(0)),ConcreteEvent.bind("ConversationPostError",function(b,c){var d=c.form,e=c.messages,f="";a.each(e,function(a,b){f+=b+"<br>"}),d.find("div.ccm-conversation-errors").html(f).show()}),ConcreteEvent.bind("ConversationSubmitForm",function(a,b){b.form.find("div.ccm-conversation-errors").hide()}));var d=c.options.paginate?1:0,e=""!=c.options.posttoken?1:0,f=c.options.addMessageLabel?c.options.addMessageLabel:"";c.$replyholder=c.$element.find("div.ccm-conversation-add-reply"),c.$newmessageform=c.$element.find("div.ccm-conversation-add-new-message form"),c.$deleteholder=c.$element.find("div.ccm-conversation-delete-message"),c.$attachmentdeleteholder=c.$element.find("div.ccm-conversation-delete-attachment"),c.$permalinkholder=c.$element.find("div.ccm-conversation-message-permalink"),c.$messagelist=c.$element.find("div.ccm-conversation-message-list"),c.$messagecnt=c.$element.find(".ccm-conversation-message-count"),c.$postbuttons=c.$element.find("button[data-submit=conversation-message]"),c.$sortselect=c.$element.find("select[data-sort=conversation-message-list]"),c.$loadmore=c.$element.find("[data-load-page=conversation-message-list]"),c.$messages=c.$element.find("div.ccm-conversation-messages"),c.$messagerating=c.$element.find("span.ccm-conversation-message-rating"),c.$element.on("click.cnv","button[data-submit=conversation-message]",function(){return c.submitForm(a(this)),!1});var g=1;c.$element.on("click.cnv","a[data-toggle=conversation-reply]",function(b){b.preventDefault(),a(".ccm-conversation-attachment-container").each(function(){a(this).is(":visible")&&a(this).toggle()});var d=c.$replyholder.appendTo(a(this).closest("div[data-conversation-message-id]"));return d.attr("data-form","conversation-reply").show(),d.find("button[data-submit=conversation-message]").attr("data-post-parent-id",a(this).attr("data-post-parent-id")),d.attr("rel","new-reply"+g),g++,!1}),a(".ccm-conversation-attachment-container").hide(),a(".ccm-conversation-add-new-message .ccm-conversation-attachment-toggle").off("click.cnv").on("click.cnv",function(b){b.preventDefault(),a(".ccm-conversation-add-reply .ccm-conversation-attachment-container").is(":visible")&&a(".ccm-conversation-add-reply .ccm-conversation-attachment-container").toggle(),a(".ccm-conversation-add-new-message .ccm-conversation-attachment-container").toggle()}),a(".ccm-conversation-add-reply .ccm-conversation-attachment-toggle").off("click.cnv").on("click.cnv",function(b){b.preventDefault(),a(".ccm-conversation-add-new-message .ccm-conversation-attachment-container").is(":visible")&&a(".ccm-conversation-add-new-message .ccm-conversation-attachment-container").toggle(),a(".ccm-conversation-add-reply .ccm-conversation-attachment-container").toggle()}),c.$element.on("click.cnv","a[data-submit=delete-conversation-message]",function(){var b=a(this);return c.$deletedialog=c.$deleteholder.clone(),c.$deletedialog.dialog?c.$deletedialog.dialog({modal:!0,dialogClass:"ccm-conversation-dialog",title:c.$deleteholder.attr("data-dialog-title"),buttons:[{text:c.$deleteholder.attr("data-cancel-button-title"),"class":"btn pull-left",click:function(){c.$deletedialog.dialog("close")}},{text:c.$deleteholder.attr("data-confirm-button-title"),"class":"btn pull-right btn-danger",click:function(){c.deleteMessage(b.attr("data-conversation-message-id"))}}]}):confirm("Remove this message? Replies to it will not be removed.")&&c.deleteMessage(b.attr("data-conversation-message-id")),!1}),c.$element.on("click.cnv","a[data-submit=flag-conversation-message]",function(){var b=a(this);return confirm("Are you sure you want to flag this messge as spam?")&&c.flagMessage(b.attr("data-conversation-message-id")),!1}),c.$element.on("change.cnv","select[data-sort=conversation-message-list]",function(){c.$messagelist.load(CCM_TOOLS_PATH+"/conversations/view_ajax",{cnvID:c.options.cnvID,task:"get_messages",cID:c.options.cID,blockID:c.options.blockID,enablePosting:e,displayMode:c.options.displayMode,itemsPerPage:c.options.itemsPerPage,paginate:d,addMessageLabel:f,orderBy:a(this).val(),enableOrdering:c.options.enableOrdering,displayPostingForm:c.options.displayPostingForm,insertNewMessages:c.options.insertNewMessages,enableCommentRating:c.options.enableCommentRating,dateFormat:c.options.dateFormat,customDateFormat:c.options.customDateFormat,blockAreaHandle:c.options.blockAreaHandle},function(){c.$replyholder.appendTo(c.$element),a(".ccm-conversation-messages .dropdown-toggle").dropdown(),c.attachBindings()})}),c.$element.on("click.cnv",".image-popover-hover",function(){a.magnificPopup.open({items:{src:a(this).attr("data-full-image"),type:"image",verticalFit:!0}})}),c.$element.on("click.cnv","[data-load-page=conversation-message-list]",function(){var b=parseInt(c.$loadmore.attr("data-next-page")),d=parseInt(c.$loadmore.attr("data-total-pages")),g={cnvID:c.options.cnvID,cID:c.options.cID,blockID:c.options.blockID,itemsPerPage:c.options.itemsPerPage,displayMode:c.options.displayMode,blockAreaHandle:c.options.blockAreaHandle,enablePosting:e,addMessageLabel:f,page:b,orderBy:c.$sortselect.val(),enableCommentRating:c.options.enableCommentRating,dateFormat:c.options.dateFormat,customDateFormat:c.options.customDateFormat};a.ajax({type:"post",data:g,url:CCM_TOOLS_PATH+"/conversations/message_page",success:function(e){c.$messages.append(e),a(".ccm-conversation-messages .dropdown-toggle").dropdown(),b+1>d?c.$loadmore.hide():c.$loadmore.attr("data-next-page",b+1)}})}),c.$element.on("click.cnv",".conversation-rate-message",function(){var b=a(this).closest("[data-conversation-message-id]").attr("data-conversation-message-id"),d=a(this).attr("data-conversation-rating-type");c.$messagerating.load(CCM_TOOLS_PATH+"/conversations/rate");var e={cnvID:c.options.cnvID,cID:c.options.cID,blockID:c.options.blockID,cnvMessageID:b,cnvRatingTypeHandle:d,commentRatingUserID:c.options.commentRatingUserID,commentRatingIP:c.options.commentRatingIP};a.ajax({type:"post",data:e,url:CCM_TOOLS_PATH+"/conversations/rate",success:function(){a('span[data-message-rating="'+b+'"]').load(CCM_TOOLS_PATH+"/conversations/get_rating",{cnvMessageID:b})}})}),c.$element.on("click.cnv","a.share-permalink",function(){var d=(a(this),a(this).attr("rel"));return c.$permalinkdialog=c.$permalinkholder.clone(),c.$permalinkdialog.append("<textarea>"+d+"</textarea>"),c.$permalinkdialog.find("textarea").click(function(){var c=a(this);c.select(),b.setTimeout(function(){c.select()},1),c.mouseup(function(){return c.unbind("mouseup"),!1})}),c.$permalinkdialog.dialog&&c.$permalinkdialog.dialog({modal:!0,dialogClass:"ccm-conversation-dialog",title:c.$permalinkholder.attr("data-dialog-title"),buttons:[{text:c.$permalinkholder.attr("data-cancel-button-title"),"class":"btn pull-left",click:function(){c.$permalinkdialog.dialog("close")}}]}),!1}),c.$element.ccmconversationattachments(c),a(".dropdown-toggle").dropdown()},handlePostError:function(a,b){if(!b)var b=["An unspecified error occurred."];this.publish("conversationPostError",{form:a,messages:b})},deleteMessage:function(c){var d=this;d.publish("conversationBeforeDeleteMessage",{msgID:c});var e=[{name:"cnvMessageID",value:c}];a.ajax({type:"post",data:e,url:CCM_TOOLS_PATH+"/conversations/delete_message",success:function(b){var e=a("div[data-conversation-message-id="+c+"]");e.length&&e.after(b).remove(),d.updateCount(),d.$deletedialog.dialog&&d.$deletedialog.dialog("close"),d.publish("conversationDeleteMessage",{msgID:c})},error:function(){d.publish("conversationDeleteMessageError",{msgID:c,error:arguments}),b.alert("Something went wrong while deleting this message, please refresh and try again.")}})},flagMessage:function(c){var d=this;d.publish("conversationBeforeFlagMessage",{msgID:c});var e=[{name:"cnvMessageID",value:c}];a.ajax({type:"post",data:e,url:CCM_TOOLS_PATH+"/conversations/flag_message",success:function(b){var e=a("div[data-conversation-message-id="+c+"]");e.length&&e.after(b).remove(),d.updateCount(),d.publish("conversationFlagMessage",{msgID:c})},error:function(){d.publish("conversationFlageMessageError",{msgID:c,error:arguments}),b.alert("Something went wrong while flagging this message, please refresh and try again.")}})},addMessageFromJSON:function(b,c){var d=this;d.publish("conversationBeforeAddMessageFromJSON",{json:c,form:b});var e=""!=d.options.posttoken?1:0,f=[{name:"cnvMessageID",value:c.cnvMessageID},{name:"enablePosting",value:e},{name:"displayMode",value:d.options.displayMode},{name:"enableCommentRating",value:d.options.enableCommentRating}];a.ajax({type:"post",data:f,url:CCM_TOOLS_PATH+"/conversations/message_detail",success:function(e){var f=a("div[data-conversation-message-id="+c.cnvMessageParentID+"]");f.length?(f.after(e),d.$replyholder.appendTo(d.$element),d.$replyholder.hide()):("bottom"==d.options.insertNewMessages?d.$messages.append(e):d.$messages.prepend(e),d.$element.find(".ccm-conversation-no-messages").hide()),d.publish("conversationAddMessageFromJSON",{json:c,form:b}),d.updateCount();var g=a("a#cnvMessage"+c.cnvMessageID).offset();a(".dropdown-toggle").dropdown(),a("html, body").animate({scrollTop:g.top},800,"linear")}})},updateCount:function(){var a=this;a.publish("conversationBeforeUpdateCount"),a.$messagecnt.load(CCM_TOOLS_PATH+"/conversations/count_header",{cnvID:a.options.cnvID},function(){a.publish("conversationUpdateCount")})},submitForm:function(b){var c=this;c.publish("conversationBeforeSubmitForm");var d=b.closest("form");b.prop("disabled",!0),d.parent().addClass("ccm-conversation-form-submitted");var e=d.serializeArray(),f=b.attr("data-post-parent-id");e.push({name:"token",value:c.options.posttoken},{name:"cnvID",value:c.options.cnvID},{name:"cnvMessageParentID",value:f},{name:"enableRating",value:f}),a.ajax({dataType:"json",type:"post",data:e,url:CCM_TOOLS_PATH+"/conversations/add_message",success:function(b){return b?b.error?(c.handlePostError(d,b.messages),!1):(a(".preview.processing").each(function(){a('input[rel="'+a(this).attr("rel")+'"]').remove()}),a("form.dropzone").each(function(){var b=a(this).data("dropzone");a.each(b.files,function(a,c){b.removeFile(c)})}),c.addMessageFromJSON(d,b),void c.publish("conversationSubmitForm",{form:d,response:b})):(c.handlePostError(d),!1)},error:function(){return c.handlePostError(d),!1},complete:function(){b.prop("disabled",!1),d.parent().closest(".ccm-conversation-form-submitted").removeClass("ccm-conversation-form-submitted")}})},tool:{setCaretPosition:function(a,b){if(null!=a)if(a.createTextRange){var c=a.createTextRange();c.move("character",b),c.select()}else a.selectionStart?(a.focus(),a.setSelectionRange(b,b)):a.focus()},getCaretPosition:function(a){if(a.selectionStart)return a.selectionStart;if(document.selection){a.focus();var b=document.selection.createRange();if(null==b)return 0;var c=a.createTextRange(),d=c.duplicate();return c.moveToBookmark(b.getBookmark()),d.setEndPoint("EndToStart",c),d.text.length}return 0},testMentionString:function(a){return/^@[a-z0-9]+$/.test(a)},getMentionMatches:function(a,b){return b.filter(function(b){return b.indexOf(a)>=0})},isSameConversation:function(a,b){return a.options.blockID===b.options.blockID&&a.options.cnvID===b.options.cnvID},MentionUser:function(a){this.getName=function(){return a}}}}}(jQuery,window),function(a,b){var c={init:function(b){var c=b;return c.$element.on("click.cnv","a[data-toggle=conversation-reply]",function(){a(".ccm-conversation-wrapper").ccmconversationattachments("clearDropzoneQueues")}),c.$element.on("click.cnv","a.attachment-delete",function(b){b.preventDefault(),a(this).ccmconversationattachments("attachmentDeleteTrigger",c)}),c.$newmessageform.dropzone&&!a(c.$newmessageform).attr("data-dropzone-applied")&&(c.$newmessageform.dropzone({accept:function(b,d){var e=[],f=this.files.length;if(c.options.maxFiles>0&&f>c.options.maxFiles){e.push("Too many files");var g=!0}var h=c.options.fileExtensions.split(",");if(b.name.split(".").pop().toLowerCase()&&-1==h.indexOf(b.name.split(".").pop().toLowerCase())&&""!=h){e.push("Invalid file extension");var i=!0}if(c.options.maxFileSize>0&&b.size>1e6*c.options.maxFileSize){e.push("Max file size exceeded");var j=!0}if(j||g||i){var k=this;a('input[rel="'+a(b.previewTemplate).attr("rel")+'"]').remove();var l=a(b.previewTemplate).parent(".dropzone");k.removeFile(b),c.handlePostError(l,e),l.children(".ccm-conversation-errors").delay(3e3).fadeOut("slow",function(){a(this).html("")});var f=-1;d("error")}else d()},url:CCM_TOOLS_PATH+"/conversations/add_file",success:function(b,d){var e=this;a(b.previewTemplate).click(function(){a('input[rel="'+a(this).attr("rel")+'"]').remove(),e.removeFile(b)});var f=JSON.parse(d);if(f.error){var g=a('.preview.processing[rel="'+f.timestamp+'"]').closest("form");c.handlePostError(g,[f.error]),a('.preview.processing[rel="'+f.timestamp+'"]').remove(),g.children(".ccm-conversation-errors").delay(3e3).fadeOut("slow",function(){a(this).html("")})}else a('div[rel="'+f.tag+'"] form.main-reply-form').append('<input rel="'+f.timestamp+'" type="hidden" name="attachments[]" value="'+f.id+'" />')},sending:function(b,d,e){a(b.previewTemplate).attr("rel",(new Date).getTime()),e.append("timestamp",a(b.previewTemplate).attr("rel")),e.append("tag",a(c.$newmessageform).parent("div").attr("rel")),e.append("fileCount",this.files.length)},init:function(){a(this.element).data("dropzone",this)}}),a(c.$newmessageform).attr("data-dropzone-applied","true")),a(c.$replyholder.find(".dropzone")).attr("data-dropzone-applied")||c.$replyholder.find(".dropzone").not('[data-drozpone-applied="true"]').dropzone({url:CCM_TOOLS_PATH+"/conversations/add_file",success:function(b,d){var e=this;a(b.previewTemplate).click(function(){e.removeFile(b),a('input[rel="'+a(this).attr("rel")+'"]').remove()});var f=JSON.parse(d);if(f.error){var g=a('.preview.processing[rel="'+f.timestamp+'"]').closest("form");c.handlePostError(g,[f.error]),a('.preview.processing[rel="'+f.timestamp+'"]').remove(),g.children(".ccm-conversation-errors").delay(3e3).fadeOut("slow",function(){a(this).html("")})}else a(this.element).closest("div.ccm-conversation-add-reply").find("form.aux-reply-form").append('<input rel="'+f.timestamp+'" type="hidden" name="attachments[]" value="'+f.id+'" />')},accept:function(b,d){var e=[],f=this.files.length;if(c.options.maxFiles>0&&f>c.options.maxFiles){e.push("Too many files");var g=!0}var h=c.options.fileExtensions.split(",");if(b.name.split(".").pop().toLowerCase()&&-1==h.indexOf(b.name.split(".").pop().toLowerCase())&&""!=h){e.push("Invalid file extension");var i=!0}if(c.options.maxFileSize>0&&b.size>1e6*c.options.maxFileSize){e.push("Max file size exceeded");var j=!0}if(j||g||i){var k=this;a('input[rel="'+a(b.previewTemplate).attr("rel")+'"]').remove();var l=a(b.previewTemplate).parent(".dropzone");k.removeFile(b),c.handlePostError(l,e),l.children(".ccm-conversation-errors").delay(3e3).fadeOut("slow",function(){a(this).html("")});var f=-1;d("error")}else d()},sending:function(b,d,e){a(b.previewTemplate).attr("rel",(new Date).getTime()),e.append("timestamp",a(b.previewTemplate).attr("rel")),e.append("tag",a(c.$newmessageform).parent("div").attr("rel")),e.append("fileCount",a(c.$replyHolder).find('[name="attachments[]"]').length)},init:function(){a(this.element).data("dropzone",this)}}),a(c.$replyholder.find(".dropzone")).attr("data-dropzone-applied","true"),a.each(a(this),function(){a(this).find(".ccm-conversation-attachment-container").each(function(){a(this).is(":visible")&&a(this).toggle()})})},attachmentDeleteTrigger:function(b){var c=b,d=a(this);return c.$attachmentdeletetdialog=c.$attachmentdeleteholder.clone(),c.$attachmentdeletetdialog.dialog?c.$attachmentdeletetdialog.dialog({modal:!0,dialogClass:"ccm-conversation-dialog",title:c.$attachmentdeletetdialog.attr("data-dialog-title"),buttons:[{text:c.$attachmentdeleteholder.attr("data-cancel-button-title"),"class":"btn pull-left",click:function(){c.$attachmentdeletetdialog.dialog("close")}},{text:c.$attachmentdeleteholder.attr("data-confirm-button-title"),"class":"btn pull-right btn-danger",click:function(){a(this).ccmconversationattachments("deleteAttachment",{cnvMessageAttachmentID:d.attr("rel"),cnvObj:c,dialogObj:c.$attachmentdeletetdialog})}}]}):confirm("Remove this message? Replies to it will not be removed.")&&a(this).ccmconversationattachments("deleteAttachment",{cnvMessageAttachmentID:d.attr("rel"),cnvObj:c,dialogObj:c.$attachmentdeletetdialog}),!1},clearDropzoneQueues:function(){a(".preview.processing").each(function(){a('input[rel="'+a(this).attr("rel")+'"]').remove()}),a("form.dropzone").each(function(){var b=a(this).data("dropzone");a.each(b.files,function(a,c){b.removeFile(c)})})},deleteAttachment:function(c){var d=c.cnvMessageAttachmentID,e=c.cnvObj,f=c.dialogObj,g=[{name:"cnvMessageAttachmentID",value:d}];a.ajax({type:"post",data:g,url:CCM_TOOLS_PATH+"/conversations/delete_file",success:function(b){var c=JSON.parse(b);a('p[rel="'+c.attachmentID+'"]').parent(".attachment-container").fadeOut(300,function(){a(this).remove()}),f.dialog&&(f.dialog("close"),e.publish("conversationDeleteAttachment",{cnvMessageAttachmentID:d}))},error:function(){e.publish("conversationDeleteAttachmentError",{cnvMessageAttachmentID:d,error:arguments}),b.alert("Something went wrong while deleting this attachment, please refresh and try again.")}})}};a.fn.ccmconversationattachments=function(b){return c[b]?c[b].apply(this,Array.prototype.slice.call(arguments,1)):"object"!=typeof b&&b?void a.error("Method "+b+" does not exist on jQuery.tooltip"):c.init.apply(this,arguments)}}(jQuery,window);
//# sourceMappingURL=/concrete/js/ccm.conversations.js.map