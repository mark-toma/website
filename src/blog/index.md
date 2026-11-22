---
layout: base.html
title: Blog
permalink: /blog/
---

# Blog

Technical writings and thoughts.

```shell
$ sudo journalctl -u blog.service
# See posts below...
```

## Posts

{% for post in collections.blog %}
[{{ post.date | htmlDateString }}] [{{ post.data.title }}]({{ post.url | url(site.basePath) }})
{% endfor %}

