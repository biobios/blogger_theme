
(function (){
	const comment_Iframe_url = "<data:post.commentFormIframeSrc/>";
						//<![CDATA[
	const comment_Iframe_reply_url_postfix = "&amp;parentID=";
	const comment_Iframe_className = 'comment-form';
	
	const comments_wrapper = document.getElementById('comments-wrapper');
	const reply_className = 'reply-holder';
	const reply_toggle_className = 'reply-toggle';
	const expanded_postfix = '-expanded';
	const collapsed_postfix = '-collapsed';
	const default_postfix = expanded_postfix;
	const reply_toggleText = 'i18n.reply_comment_button';
	
	const temp_cmt_strage = Array();
	while(comments_wrapper.children.length != 0){
		const elem = comments_wrapper.children[0]
		elem.remove();
		temp_cmt_strage.push(elem);
	}//すべてのコメントをDOM上から削除して配列に格納する
	
	function has_reply(node){
		for(const elem of node.children){
			if(elem.className == (reply_className)){
				return elem;
			}
		}
		return null;
	}
	
	const proccessed_cmts = Array();
	while(temp_cmt_strage.length != 0){//未処理のコメントがゼロになるまで続ける
		const target = temp_cmt_strage.shift();
		let holder = comments_wrapper;
		for(const elem of proccessed_cmts){//すべての処理済みのコメントに対して
			if(elem.id == target.dataset.replyto){//ターゲットのリプライ先が一致するものを探し出して
				let reply_holder;
				if(!(reply_holder = has_reply(elem))){
					reply_holder = document.createElement('div');
					reply_holder.className = reply_className;
					const reply_toggle = document.createElement('div');
					reply_toggle.className = reply_toggle_className + default_postfix;
					reply_toggle.innerText = reply_toggleText;
					elem.appendChild(reply_toggle);
					elem.appendChild(reply_holder);
				}
				holder = reply_holder;//リプライホルダーを出す
				break;
			}
		}//存在しない場合comments_wrapper
		holder.appendChild(target);
		proccessed_cmts.push(target);
	}
	
	function reply_toggle_callback(e){
		if(e.currentTarget.className.includes(expanded_postfix)){
			e.currentTarget.className = reply_toggle_className + collapsed_postfix;
		}else{
			e.currentTarget.className = reply_toggle_className + expanded_postfix;
		}
	}
	
	const reply_toggles = document.getElementsByClassName(reply_toggle_className + expanded_postfix);
	for(const elem of reply_toggles){
		elem.addEventListener('click', reply_toggle_callback, false);
	}
	
	//コメントボタンイベント
	//IFrame作成
	const comment_form = document.createElement('iframe');
	comment_form.setAttribute('allowtrandparency', 'true');
	comment_form.setAttribute('frameborder', '0');
	comment_form.className = comment_Iframe_className;
	
	function reply_post_button_callback(e){//返信投稿コールバック
		anc_comment_holder = e.currentTarget.parentNode;
		while(anc_comment_holder != null && !anc_comment_holder.classList.contains('comment-holder')){
			anc_comment_holder = anc_comment_holder.parentNode;
		}
		if(anc_comment_holder == comment_form.parentNode)return;
		comment_form.remove();
		comment_form.src = comment_Iframe_url + comment_Iframe_reply_url_postfix + anc_comment_holder.id;
		const comment_article = anc_comment_holder.getElementsByClassName('comment-article')[0];
		anc_comment_holder.insertBefore(comment_form, comment_article.nextElementSibling);
	}
	function comment_post_button_callback(e){//コメント投稿コールバック
		if( e.currentTarget.parentNode == comment_form.parentNode )return;
		comment_form.remove();
		comment_form.src = comment_Iframe_url;
		e.currentTarget.parentNode.insertBefore(comment_form, e.currentTarget.nextElementSibling);
	}
	
	let reply_post_buttons = document.getElementsByClassName('reply-button');
	for( const elem of reply_post_buttons ){
		elem.addEventListener('click', reply_post_button_callback, false);
	}
	document.getElementById('post_comment_button').addEventListener('click', comment_post_button_callback, false);
	
	
})()
//]]>