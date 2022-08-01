---
id: 383
title: 'iOS: Split a string at case change'
date: 2011-10-19T16:23:03+00:00
author: nick
layout: post
guid: http://18.221.236.252/?p=383
permalink: /?p=383
categories:
  - news
---
I was looking to split a string on case changes today, and googling that problem didn&#8217;t turn up much. Here&#8217;s my implementation via a category. I hope it helps someone.

<pre class="prettyprint lang-m">@interface NSString (Extensions)

- (NSString*) spacify;

@end

@implementation NSString (Extensions)

- (NSString*) spacify {
    // ignore irrelevant strings
    if (self.length &lt; 1)
        return self;
    
    NSMutableString* result = [NSMutableString stringWithString:self];
    
    // create a range starting after the first character
    NSRange range;
    range.location = 1;
    range.length = self.length - 1;
    
    // match any uppercase character
    NSRegularExpression* r = [NSRegularExpression
        regularExpressionWithPattern: @"[A-Z]"
                             options: 0
                               error: nil];
    
    // replace matches with the match preceded by a space
    [r replaceMatchesInString: result 
                      options: 0 
                        range: range 
                 withTemplate: @" $0"];

    return [NSString stringWithString:result];
}

@end

</pre>