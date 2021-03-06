let entry_tags = document.querySelectorAll('script.react-add-script')
for (const tg of entry_tags) {
    let entry_script_url = new URL(tg.getAttribute('data-entry'), window.location.origin)

    add_scripts(entry_script_url, tg) 
}


function add_scripts(entry_script_url, entry_tag) {
    let first_react_script = Element

    if (entry_tag) {

        first_react_script = document.createElement('script')
        first_react_script.setAttribute('type', 'text/babel')
        first_react_script.setAttribute('data-plugins', 'transform-es2015-modules-umd')
        first_react_script.setAttribute('crossorigin', '')
        first_react_script.src = entry_script_url
        entry_tag.after(first_react_script)
    }
    let babel_scripts = document.querySelectorAll('script[type="text/babel"]');
    for (const script of babel_scripts) {
        add_curr_scripts(script, first_react_script,true)

    }
   
}

function add_curr_scripts(script, first_react_script, first=false) {
    let text = file_get_contents(script.src)
    let imports = find_imports(text)

    if (first) {
      import_script(imports, script, first_react_script)   
    }else{

    }
   

}

function import_script(imports, parent_script) {

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

}

function find_imports(text) {
    let result = []
    let reg =/(import\s[\w\s,]*\sfrom\s['"\s*][\s\w\.\/-]*["'])|(import\s{[\w\s,]*}\sfrom\s['"\s*][\s\w\.\/-]*["'])/gm
    let match = text.match(reg)
    if (match && match.length) {
        for (const item of match) {
            let src = item.match(/("[\S]*")|('[\S]*')/)
            if (src.length) {
                result.push(src[0].replace(/'|"/gm, ''))

            }
        }
    }
    return result
}

function replace_important() {
    
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