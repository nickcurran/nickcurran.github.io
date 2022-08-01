---
id: 358
title: handleNoSuchRequestHandlingMethod
date: 2011-03-27T15:40:45+00:00
author: nick
layout: post
guid: http://18.221.236.252/?p=358
permalink: /?p=358
categories:
  - tech
---
That&#8217;s a terrible blog post title, I know. Nevertheless, I just burned 90 minutes trying to figure out why a simple Spring MultiActionController setup left me with an error: &#8220;No request handling method with name &#8216;list&#8217; in class.&#8221; Google was little help, so I resorted to Bing.

Eventually, I found a buried forum response with my exact problem, I had referenced the wrong package&#8217;s type! If you&#8217;re running in to this, make sure you do this:

> import org.springframework.web._servlet_.ModelAndView;

and not this:

> import org.springframework.web._portlet_.ModelAndView;

This will teach me to be more mindful of what Eclipse decides to add for me automatically.