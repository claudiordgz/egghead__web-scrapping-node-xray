---
layout: default
title: Making an Aweome P2P Audio Player Begins
---

# How it all began

It's hard to remember the genesis of things. I was watching some videos in the now defunct gametrailers.com and some other in screwattack in youtube back when Handsome Tom was still doing his 'Useless knowledge' bits.

I remember hearing a sound that deafened everything else. It was the perfect blend of what I needed and what I wanted. 

That day I discovered something that would help me overcome most problems in life. 

I changed careers, I changed countries, I got married, and finished projects.

All with OCReMix music right by my side.

This is my thank you, and this is where it starts, but not where it ends.

<div class="posts">
  {% for post in site.posts %}
      <article class="post">
      
        <h1><a href="{{ site.baseurl }}{{ post.url }}">{{ post.title }}</a></h1>
            
        <div class="entry">
          {{ post.excerpt }}
        </div>
                                
        <a href="{{ site.baseurl }}{{ post.url }}" class="read-more">Read More</a>
      </article>
  {% endfor %}
</div>
