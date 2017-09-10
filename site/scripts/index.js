async function interpolateCodeExamples() {
    let script = await $.getScript('examples/schemas/User.js')
    document.querySelector('code.example1').innerHTML = script.replace(/(?:\r\n|\r|\n)/g, '<br />')
}

interpolateCodeExamples()