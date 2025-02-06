# Imago - SDRUK

To add a job follow the following structure:

```
---
layout: false
title: string
location: string
salary: string
hours: string
contract: string
posted: string
closing_date: string
url: string
---

Write the rest of the content in markdown
```

And save to ./src/lib/content/jobs/{name}.md

NOTE: {name} should be a slug! that means, only letters, numbers and "-" / "." / "\_" / "~" eg.

this-is-a-new-job.md ✅
this is a new job.md ❌
