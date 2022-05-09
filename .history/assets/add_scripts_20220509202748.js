let entry_tags = document.querySelectorAll("script.react-add-script");
for (const tg of entry_tags) {
    let entry_script_url = new URL(
        tg.getAttribute("data-entry"),
        window.location.origin
    );

    add_scripts(entry_script_url, tg);
}

function add_scripts(entry_script_url, entry_tag) {
    let first_react_script = Element;

    if (entry_tag) {
        first_react_script = document.createElement("script");
        first_react_script.setAttribute("type", "text/babel");
        first_react_script.setAttribute(
            "data-plugins",
            "transform-es2015-modules-umd"
        );
        first_react_script.setAttribute("crossorigin", "");
        let content = file_get_contents(entry_script_url);
        first_react_script.textContent = replace_imports(content);
        entry_tag.after(first_react_script);
    }
    /*  let babel_scripts = document.querySelectorAll('script[type="text/babel"]');
     for (const script of babel_scripts) {
         add_curr_scripts(script, first_react_script)

     } */
}

/* function add_curr_scripts(script, first_react_script) {
    let text = file_get_contents(script.src)
    let imports = find_imports(text)
    import_script(imports, script, first_react_script)

} */

/* function import_script(imports, parent_script) {

    for (const imp of imports) {
        let script = document.createElement('script')
        script.setAttribute('type', 'text/babel')
        script.setAttribute('data-plugins', 'transform-es2015-modules-umd')
        script.setAttribute('crossorigin', '')
        script.src = imp
        parent_script.before(script)
       
        if (find_imports(file_get_contents(script.src)).length) {
            add_curr_scripts(script, script)
        }
    }

} */

function replace_imports(text) {
    let result = "";

    rec(text);

    function rec(n_text) {
        
        let reg =
            /(import\s[\w\s,]*\sfrom\s['"\s*][\s\w\.\/-]*["'])|(import\s{[\w\s,]*}\sfrom\s['"\s*][\s\w\.\/-]*["'])/gm;
        let matches = n_text.match(reg);
        if (matches && matches.length) {
            for (const item of matches) {
                let src = item
                    .match(/("[\S]*")|('[\S]*')/)[0]
                    .replace(/'|"/gm, "");
                let script = file_get_contents(src);
                result = n_text = n_text.replace(item, script);
                if (n_text.match(reg).length) {
                    rec(n_text)
                }
            }
        }
    }
    return result;
}

function file_get_contents(url) {
    // Reads entire file into a string

    var req = null;

    try {
        req = new ActiveXObject("Msxml2.XMLHTTP");
    } catch (e) {
        try {
            req = new ActiveXObject("Microsoft.XMLHTTP");
        } catch (e) {
            try {
                req = new XMLHttpRequest();
            } catch (e) {}
        }
    }

    if (req == null) throw new Error("XMLHttpRequest not supported");

    req.open("GET", url, false);
    req.send(null);

    return req.responseText;
}
