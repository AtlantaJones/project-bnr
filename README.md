Project BNR
===========

This project is an "audition" of sorts for the folks at Big Nerd Ranch (http://bignerdranch.com), an Atlanta-based shop that builds apps, websites, writes books and teaches other nerds how to write code. They sound pretty cool, eh? I thought so.

One thing I noticed about the BNR site was that it (at least currently) isn't responsive. Meaning, it wasn't built in a way that it could adapt to different screen sizes, devices, etc. So I decided to see if I could rebuild their homepage to be responsive.

See the result here: http://bnr.atlantajones.com

I started by downloading their index page and all related assets, including images, CSS and JavaScript files. Then I installed the amazing Foundation Framework (http://foundation.zurb.com) and added a few mixins I've used on other projects.

I took their main CSS file and stripped out everything that wasn't needed to drive the homepage and also omitted some JavaScript files. I created a couple SASS files, which would house all my custom styles and overrides. For the most part, most of the styles and images are still coming from their original site, in the /old folder. I just provided the overrides needed to make things responsive. This also required me to replace a lot of the page's existing layout structure with those of the Foundation Framework.

One major challenge the existing homepage posed was that a LOT of its elements are absolutely positioned, and many decisions in building it were obviously made thinking it would never be larger or smaller than 1024 pixels. Once I started challenging that, a lot of the absolutely positioned dependencies had to go out the door.

In the end, I think it's a really solid proof-of-concept. Still not perfect, and doesn't represent my "best practices". But as a responsive demo, I think it works. All in, I bet I've spent 30-40 hours on it, although I wasn't paying much attention to the clock. Time flies, as they say.

I've always asserted that trying to retrofit an existing site to be responsive is a fool's errand. If the site was never envisioned to be flexible, it was likely built in a way that would make conversion more trouble than it's worth. Having finished this project, I'm now certain that you should never try it :)

To anyone at BNR reading this, I hope you like what I've come up with. Definitely load it up on an iPad, iPhone or any mobile device to see how it reshapes itself. At the very least, I hope this might make you wonder what I could REALLY do, given a blank slate.

Again, here's the link to the working demo: http://bnr.atlantajones.com

Cheers,

AJ