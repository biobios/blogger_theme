//<![CDATA[
(function (){
    const sidebar_wrapper = document.getElementById('sidebar-wrapper');
    const header_wrapper = document.getElementById('header-wrapper');

    /*中身の大きさを取得*/
    let header_height = 0;
    let header_width = 0;
    let sidebar_width = 0;
    let sidebar_height = 0;
    function getComponentSize(){
        header_height = 0;
        header_width = 0;
        sidebar_width = 0;
        sidebar_height = 0;
        for( const elem of header_wrapper.children ){
            header_height += elem.offsetHeight;
            header_width += elem.offsetWidth;
        }
        for( const elem of sidebar_wrapper.children ){
            sidebar_width += elem.offsetWidth;
            sidebar_height += elem.offsetHeight;
        }
    }
    
    let isOpen = true;
    function openMenu(e){
        if(pc_size){//pcサイズで開いたとき
            sidebar_wrapper.children[0].removeEventListener('click', menu_click_callback, false);
            document.removeEventListener('click', click_callback, false);
            sidebar_wrapper.style.width = sidebar_width + 'px';
        }else{//スマホサイズで開いたとき
            sidebar_wrapper.children[0].addEventListener('click', menu_click_callback, false);
            document.addEventListener('click', click_callback, false);
            e.biobios = e.biobios ?? {};
            e.biobios.menu_clicked = true;
        }
        sidebar_wrapper.children[0].style.left = '0px';
        isOpen = true;
    };
    function closeMenu(e){
        sidebar_wrapper.children[0].removeEventListener('click', menu_click_callback, false);
        document.removeEventListener('click', click_callback, false);
        
        sidebar_wrapper.style.width = '0px';
        sidebar_wrapper.children[0].style.left = '-' + sidebar_width + 'px';
        isOpen = false;
    };
    
    let pc_size = true;
    function windowResize_callback(e){
        getComponentSize();
        const windowWidth = document.documentElement.clientWidth;
        if(pc_size && windowWidth < 1024){//pcサイズだったのに小さくなった時
            pc_size = false
            closeMenu(e);
        }else if(!pc_size && windowWidth >= 1024){//スマホサイズだったのに大きくなった時
            pc_size = true;
            openMenu(e);
        }
        /*メニューの開閉に関係ない値を更新*/
        header_wrapper.style.height = header_height + 'px';
        sidebar_wrapper.children[0].style.top = header_height + 'px';
        document.getElementById('main-wrapper').style.height = 'calc(100vh - ' + header_height + 'px)';	/*メイン部分の高さ指定*/
    };
    window.addEventListener('resize', windowResize_callback, false);
    
    /*初期化*/
    getComponentSize();
    if(document.documentElement.clientWidth < 1024){
        pc_size = false;
        closeMenu({});
    }else{
        pc_size = true;
        openMenu({});
    }
    header_wrapper.style.height = header_height + 'px';
    sidebar_wrapper.children[0].style.top = header_height + 'px';
    document.getElementById('main-wrapper').style.height = 'calc(100vh - ' + header_height + 'px)';	/*メイン部分の高さ指定*/
    
    /*ボタンによるメニュー操作*/
    function menu_toggle_callback(e){
        if(isOpen){
            closeMenu(e);
        }else{
            openMenu(e);
        }
    }
    document.getElementById('menu-button').addEventListener('click', menu_toggle_callback, false);
    
    /*メニュー部分以外をクリックしたときにメニューを閉じる*/
    function menu_click_callback(e){
        e.biobios = e.biobios ?? {};
        e.biobios.menu_clicked = true;
    }
    function click_callback(e){
        if(!e?.biobios?.menu_clicked){
            closeMenu(e);
        }
    }
    
    /*汎用トグルメニュー*/
    const toggleButton_className = 'toggle-button';
    const expanded_postfix = '-expanded';
    const collapsed_postfix = '-collapsed';
    
    function toggleButton_callback(e){
        if(e.currentTarget.classList.contains(toggleButton_className + expanded_postfix)){
            e.currentTarget.classList.replace(toggleButton_className + expanded_postfix, toggleButton_className + collapsed_postfix);
        }else{
            e.currentTarget.classList.replace(toggleButton_className + collapsed_postfix, toggleButton_className + expanded_postfix);
        }
    }
    
    const toggleButtons = document.querySelectorAll('[class^="' + toggleButton_className + '"]');
    for(const elem of toggleButtons){
        elem.addEventListener('click', toggleButton_callback, false);
    }
})();
//]]>