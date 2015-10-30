# Email Template

Just edit index.html and style.scss and you would any other html pages. 

The style.scss file will be inlined into the html file. 

Put all media queries into style-head.scss. The style-head.scss file will be inserted into style 
tags on top, so it will work for email clients and browsers that can handle. 

Not so "smart" clients will ignore style tags, but even without media queries, the columns part 
of the email will behave sresponsive like. 

Note: the style tag isn't inserted into the head on purpose, in case if head gets stripped out by email client. 

Use 'gulp watch' to process scss files (in project folder).

Note: If you want source map, uncomment the call in the 'sass' task. 

Use 'gulp' (in project folder) to bulid final template, email-template.html.

Free to use for any purpose. 

Any feedback welcome.

Demo: http://nvco.github.io/emailTemplate/
