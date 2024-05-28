'use client'
import React from 'react'
import './codearea.css'
import '../../profile/useractivity/page.css'

import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { solarizedlight } from 'react-syntax-highlighter/dist/esm/styles/prism';

interface Props {
    id: number
    fileType: string
}

const CodeArea: React.FC<Props> = ({fileType, id}) => {

    const slideStyle = {
        width: fileType === 'html' ? 'calc(100% / 3)' : '100%'
    };

    let tabCode;

    if (fileType === 'html') {
        tabCode =
            <div className="tab-wrap">
                <input type="radio" name="tabs" id="tab1" defaultChecked />
                <div className="tab-label-content" id="tab1-content">
                    <label htmlFor="tab1">html</label>
                    <div className="tab-content">
                        {/* some html code within in pre tag for demo */}
                        <SyntaxHighlighter language="html" style={solarizedlight} showLineNumbers>
                            {`
<!DOCTYPE html>
<html>
<head>
<title>Page Title</title>
</head>
<body>

<h1>This is a Heading</h1>
<p>This is a paragraph.</p>
<h1>This is a Heading</h1>
<p>This is a paragraph.</p>
<h1>This is a Heading</h1>
<p>This is a paragraph.</p>
<h1>This is a Heading</h1>
<p>This is a paragraph.</p>
<h1>This is a Heading</h1>
<p>This is a paragraph.</p>
<h1>This is a Heading</h1>
<p>This is a paragraph.</p>
<h1>This is a Heading</h1>
<p>This is a paragraph.</p>
<h1>This is a Heading</h1>
<p>This is a paragraph.</p>
<h1>This is a Heading</h1>
<p>This is a paragraph.</p>
<h1>This is a Heading</h1>
<p>This is a paragraph.</p>
<h1>This is a Heading</h1>
<p>This is a paragraph.</p>
<h1>This is a Heading</h1>
<p>This is a paragraph.</p>
<h1>This is a Heading</h1>
<p>This is a paragraph.</p>
<h1>This is a Heading</h1>
<p>This is a paragraph.</p>
<h1>This is a Heading</h1>
<p>This is a paragraph.</p>
<h1>This is a Heading</h1>
<p>This is a paragraph.</p>

</body>
</html>
`}
                        </SyntaxHighlighter>
                    </div>
                </div>

                <input type="radio" name="tabs" id="tab2" />
                <div className="tab-label-content" id="tab2-content">
                    <label htmlFor="tab2">css</label>
                    <div className="tab-content">
                        {/* some css code within in pre tag for demo */}
                        <SyntaxHighlighter language="css" style={solarizedlight} showLineNumbers>
                            {`
body {
    background-color: lightblue;
}

h1 {
    color: white;
    text-align: center;
}
`}
                        </SyntaxHighlighter>
                    </div>
                </div>

                <input type="radio" name="tabs" id="tab3" />
                <div className="tab-label-content" id="tab3-content">
                    <label htmlFor="tab3">javascript</label>
                    <div className="tab-content">
                        {/* some js code within in pre tag for demo */}
                        <SyntaxHighlighter language="javascript" style={solarizedlight} showLineNumbers>
                            {`
document.getElementById("demo").innerHTML = "Hello JavaScript!";
document.getElementById("demo").innerHTML = "Hello JavaScript!";
document.getElementById("demo").innerHTML = "Hello JavaScript!";
document.getElementById("demo").innerHTML = "Hello JavaScript!";
document.getElementById("demo").innerHTML = "Hello JavaScript!";
document.getElementById("demo").innerHTML = "Hello JavaScript!";
document.getElementById("demo").innerHTML = "Hello JavaScript!";
document.getElementById("demo").innerHTML = "Hello JavaScript!";
document.getElementById("demo").innerHTML = "Hello JavaScript!";
document.getElementById("demo").innerHTML = "Hello JavaScript!";
document.getElementById("demo").innerHTML = "Hello JavaScript!";
document.getElementById("demo").innerHTML = "Hello JavaScript!";
document.getElementById("demo").innerHTML = "Hello JavaScript!";
document.getElementById("demo").innerHTML = "Hello JavaScript!";
document.getElementById("demo").innerHTML = "Hello JavaScript!";
document.getElementById("demo").innerHTML = "Hello JavaScript!";
document.getElementById("demo").innerHTML = "Hello JavaScript!";
document.getElementById("demo").innerHTML = "Hello JavaScript!";
document.getElementById("demo").innerHTML = "Hello JavaScript!";
document.getElementById("demo").innerHTML = "Hello JavaScript!";
document.getElementById("demo").innerHTML = "Hello JavaScript!";
document.getElementById("demo").innerHTML = "Hello JavaScript!";
document.getElementById("demo").innerHTML = "Hello JavaScript!";
document.getElementById("demo").innerHTML = "Hello JavaScript!";
document.getElementById("demo").innerHTML = "Hello JavaScript!";
document.getElementById("demo").innerHTML = "Hello JavaScript!";
document.getElementById("demo").innerHTML = "Hello JavaScript!";
document.getElementById("demo").innerHTML = "Hello JavaScript!";
document.getElementById("demo").innerHTML = "Hello JavaScript!";
document.getElementById("demo").innerHTML = "Hello JavaScript!";
document.getElementById("demo").innerHTML = "Hello JavaScript!";
document.getElementById("demo").innerHTML = "Hello JavaScript!";
`}

                        </SyntaxHighlighter>
                    </div>
                </div>
                <div className="slide" style={slideStyle}></div>
            </div>

    } else if (fileType === 'python') {
        tabCode =
            <div className="tab-wrap">
                <input type="radio" name="tabs" id="tab1" defaultChecked />
                <div className="tab-label-content" id="tab1-content">
                    <label htmlFor="tab1">python</label>
                    <div className="tab-content">
                        {/* some python code within in pre tag for demo */}
                        <SyntaxHighlighter language="python" style={solarizedlight} showLineNumbers>
                            {`
# writ the most efficient python code to check prime number
# it will be used in production
def is_prime(n):
    if n <= 1:
        return False
    if n <= 3:
        return True
    if n % 2 == 0 or n % 3 == 0:
        return False
    i = 5
    while i * i <= n:
        if n % i == 0 or n % (i + 2) == 0:
            return False
        i += 6
    return True


# This is a test code
# We can also modify this code to check if it a perfect number
def test_is_prime():
    assert is_prime(2) == True
    assert is_prime(3) == True
    assert is_prime(4) == False
    assert is_prime(5) == True
    assert is_prime(6) == False
    assert is_prime(7) == True
    assert is_prime(8) == False
    assert is_prime(9) == False
    assert is_prime(10) == False
    assert is_prime(11) == True
    print('All test cases passed')
`}
                        </SyntaxHighlighter>
                    </div>
                </div>
                <div className="slide" style={slideStyle}></div>
            </div>

    } else if (fileType === 'javascript') {
        tabCode =
            <div className="tab-wrap">
                <input type="radio" name="tabs" id="tab1" defaultChecked />
                <div className="tab-label-content" id="tab1-content">
                    <label htmlFor="tab1">javascript</label>
                    <div className="tab-content">
                        {/* some javascript code within in pre tag for demo */}

                        <SyntaxHighlighter language="javascript" style={solarizedlight} showLineNumbers >
                            {`
document.getElementById("demo").innerHTML = "Hello JavaScript!";
`}
                        </SyntaxHighlighter>
                    </div>
                </div>
                <div className="slide" style={slideStyle}></div>
            </div>
    }

    return (
        <div>
            {tabCode}
            {/* floating comment button */}
            <div className="floating-comment-button">
                <div className="comment-actions">
                    <button className="comment-btn"><img src='./code/alternate-comment.svg' alt='' />Comment</button>
                </div>
            </div>
        </div>
    )
}

export default CodeArea