---
id: 267
title: The Windows Media Center Saga
date: 2008-11-08T20:27:56+00:00
author: nick
layout: post
guid: http://18.221.236.252/?p=267
permalink: /?p=267
categories:
  - tech
---
Before I begin, let me clarify that I really enjoy Vista and Windows Media Center (WMC). Don&#8217;t let my [recent](http://www.apple.com/iphone) [purchases](http://www.apple.com/mac) fool you, I haven&#8217;t become a Mac, and it doesn&#8217;t look like I&#8217;m going to. WMC combined with an Xbox 360 or other Media Center Extender (MCE) provides an awesome television viewing experience, especially in HD. With the issues ironed out, it&#8217;s been working fantastically for a couple of months now.

However, my experience with it hasn&#8217;t been without its problems. The problems themselves wouldn&#8217;t have been so bad if they had been well documented online, but they weren&#8217;t. This post exists so that hopefully someone else with the same problems can save themselves some of the swearing I&#8217;ve been reduced to.

### My Setup

  * Windows Vista Ultimate
  * ASUS P5K Motherboard
  * Core 2 Quad &#8211; 2.4 Ghz
  * 4GB RAM (I only realize 3.25 under 32-bit Vista)
  * Seagate Barracuda 7200 rpm, 1TB Hard Drive
  * SiliconDust&#8217;s _awesome_ [HDHomeRun](http://www.silicondust.com/products/hdhomerun) network TV tuner

### Problem 1: Total Computer Freeze

I had used WMC on my old PC (and extended via the 360) without issue, so when I build the new box, I was pretty excited about seeing it all in HD. You can imagine my disappointment when I fired up the MCE on the 360 to try it out, seeing the great picture only to get an error message telling that WMC couldn&#8217;t connect. When I went to the PC to investigate, it was totally locked up. Not like a program had crashed&#8230; not like a blue screen&#8230; not rebooted&#8230; just totally frozen. Nothing to do but turn it off and back on.

This seemed to happen every time I used the extender. Sometimes it would happen immediately after the MCE started, usually it would happen 30 seconds or so in to watching something (live or recorded). Occasionally it would happen after 30 _minutes_ or more of fine performance &#8211; this was the most frustrating, as it would seem that some tweaking I had tried had fixed the problem.

**Solution:** It turns out that this freezing has something to do with the onboard network card of my P5K motherboard, either the hardware itself or the drivers. Strangely, simply adding another network card did not fix the problem. I had to to remove the drivers completely and disable the card in the BIOS settings. After doing that and installing a new network card, this problem has gone away.

### Problem 2: &#8220;application has launched UI unexpectedly&#8221; 

I felt great when the total lockup was solved, but that didn&#8217;t last long. Soon enough I began to get the &#8220;application has launched UI unexpectedly&#8221; error from the 360 when trying to launch the MCE. I would reboot, and occasionally that would fix the problem. I also followed the steps in this [Microsoft knowledge base article](http://support.microsoft.com/kb/934542); that seemed to fix the problem too, until a week later when it happened again. Reapplied the steps, problem solved&#8230; until a week later when I was trying to demo my sweet setup to a friend&#8230; boom. This time reapplying the steps several times did nothing, and I was ready to beat my head against the wall when I saw the annoying &#8220;low battery warning&#8221; from my mouse driver pop up.

**Solution:** Duh &#8211; that was the unexpected UI! I checked the Startup folder for all users and sure enough, the mouse driver shortcut was there. When someone starts a MCE session, it runs as a separate user on the computer, logged on in the background. So that user was effectively getting the low battery warning with no way to handle them. I moved all the shortcuts from the &#8220;all users&#8221; startup folder and put them in my own startup folder, and I haven&#8217;t seen this happen since.

I hope this helps someone. If so, let me know!