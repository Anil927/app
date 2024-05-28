'use client'
import React from 'react'
import './codearea.css'
import styles from "@/app/page.module.css"
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { solarizedlight } from 'react-syntax-highlighter/dist/esm/styles/prism';


interface TabPanelProps {
    children?: React.ReactNode;
    index: number;
    value: number;
}

const TabPanel: React.FC<TabPanelProps> = ({ children, value, index, ...other }) => {
    return (
        <div
            style={{ overflow: 'auto' }}
            role="tabpanel"
            hidden={value !== index}
            id={`simple-tabpanel-${index}`}
            aria-labelledby={`simple-tab-${index}`}
            {...other}
            className='tabpanel'
        >
            {value === index && (
                <div className='pre-tag-wrapper' style={{ marginTop: '56px' }}>
                    {children}
                </div>
            )}
        </div>
    );
};



interface CodeAreaProps {
    id: number
    fileType: string
}

const CodeArea: React.FC<CodeAreaProps> = ({ fileType, id }) => {

    const [value, setValue] = React.useState(0);

    const handleChange = (index: number) => {
        setValue(index);
    };

    const handleCommentButtonClick = () => {
        // Open the comment modal
        console.log('Comment button clicked')
    }

    let tabPanelCode;

    if (fileType === 'html') {
        tabPanelCode =
            <>
                <TabPanel value={value} index={0}>
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

</body>
</html>
`}
                    </SyntaxHighlighter>
                </TabPanel>
                <TabPanel value={value} index={1}>
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
                </TabPanel>
                <TabPanel value={value} index={2}>
                    <SyntaxHighlighter language="javascript" style={solarizedlight} showLineNumbers>
                        {`
document.getElementById("demo").innerHTML = "Hello JavaScript!";
`}
                    </SyntaxHighlighter>
                </TabPanel>
            </>
    } else if (fileType === 'python') {
        tabPanelCode =
            <>
                <TabPanel value={value} index={0}>
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
                </TabPanel>
            </>
    } else if (fileType === 'javascript') {
        tabPanelCode =
            <>
                <TabPanel value={value} index={0}>
                    <SyntaxHighlighter language="javascript" style={solarizedlight} showLineNumbers>
                        {`
document.getElementById("demo").innerHTML = "Hello JavaScript!";
`}
                    </SyntaxHighlighter>
                </TabPanel>
            </>
    } else {
        tabPanelCode = <></>
    }

    const dynamicWidthStyle = { width: fileType === 'html' ? 'calc(100% / 3)' : '100%' }


    return (
        <div className={styles.topBottomMargin}>
            <div className="tabs">
                {
                    (fileType === 'python' || fileType === 'javascript') && <button className={value === 0 ? 'tab active' : 'tab'} onClick={() => handleChange(0)} style={dynamicWidthStyle}>{fileType}</button>
                }
                {
                    fileType === 'html' &&
                    <>
                        <button className={value === 0 ? 'tab active' : 'tab'} onClick={() => handleChange(0)} style={dynamicWidthStyle}>{fileType}</button>
                        <button className={value === 1 ? 'tab active' : 'tab'} onClick={() => handleChange(1)} style={dynamicWidthStyle}>css</button>
                        <button className={value === 2 ? 'tab active' : 'tab'} onClick={() => handleChange(2)} style={dynamicWidthStyle}>javascript</button>
                    </>
                }
                <div className="slider-codearea" style={{ width: fileType === 'html' ? 'calc(100% / 3)' : '100%' }}></div>
            </div>
            {tabPanelCode}
            {/* floating comment button */}
            <div className="floating-comment-button">
                <div className="comment-actions">
                    <img src='./code/alternate-comment.svg' alt='' /><button onClick={handleCommentButtonClick} className="comment-btn">Comment</button>
                </div>
            </div>
        </div>
    );

}

export default CodeArea
