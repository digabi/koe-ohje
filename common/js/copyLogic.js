// Math-copying related functionality
function createMathImg(latex) {
    console.log('createEq')
    var img = document.createElement('img')
    img.setAttribute('alt', latex)
    var hostname = document.location.hostname
    var baseUrl = hostname === 'localhost' || hostname == '' ? '' : 'https://math-demo.abitti.fi'
    img.setAttribute('src', baseUrl + '/math.svg?latex=' + encodeURIComponent(latex))
    document.body.appendChild(img)
    return img
}

function selectElementContents(el) {
    var range = document.createRange()
    range.selectNode(el)
    var sel = window.getSelection()
    sel.removeAllRanges()
    sel.addRange(range)
}

/*
    Listens for any click event to svg-element so it can be copied to clipboard
    as image/LaTeX. Targeted towards browsers.
*/
function listenSVGEvent() {
    var lastClicked;
    $('body').on('click', 'svg', function (e) {
        var latex = $(e.target).find('title').text()
        if (!latex) {
            return
        }
        console.log(latex)
        if (lastClicked !== e.target) {
            $(lastClicked).css({ backgroundColor: "transparent" })
            $("#copying_box").stop().animate({ opacity: '100' })
        }
        lastClicked = e.target
        $(e.target).css({ backgroundColor: "#E0F4FE" })

        var el = createMathImg(latex)
        selectElementContents(el)
        e.preventDefault()
        if (typeof (sharedclass) === 'object') {
            sharedclass.copy_html_to_clipboard(el.outerHTML)
        } else {
            document.execCommand('copy')
        }
        document.body.removeChild(el)
        setTimeout(function () {
            $("#copying_box").show().fadeOut(3000)
        }, 350)
    });
}