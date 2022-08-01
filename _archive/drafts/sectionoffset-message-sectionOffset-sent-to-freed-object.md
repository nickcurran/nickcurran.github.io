---
id: 309
title: message sectionOffset sent to freed object
date: 2009-10-14T09:10:21+00:00
author: nick
layout: post
guid: http://18.221.236.252/?p=309
permalink: /?p=309
categories:
  - tech
---
Pardon the relatively technical post, but I want to document this problem somewhere in hopes that it saves someone the frustration it caused me.

I&#8217;ve been experimenting with iPhone development lately. For the most part, it&#8217;s been a fun learning process despite the quirks that Xcode, IB, and Obj-C throw at an MS developer. Objective-C is, at worst, a 20-year-old hack that follows few conventions established by most other OO languagues. 

My most recent lesson has been adapting my project to use Core Data for persistence. Early on, I kept receiving the error &#8220;message sectionOffset sent to freed object&#8221; when trying to load a connected table.

I found the solution nowhere online, and the exception is not at all helpful. For me, the problem was that I was trying to access the FetchedResultsController _before_ performFetch had been called. Adding performFetch to my viewDidLoad fixed the issue, and I was on my way. My iPhone app is on its way.