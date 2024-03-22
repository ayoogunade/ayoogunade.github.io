# Sphinx Profile Page

This is is a template for a resume/ personal portfolio, built with Sphinx! Based on [Chris Holdgraf's personal site](https://github.com/choldgraf/choldgraf.github.io)

This template is designed for use in NSBE 50 Workshop: Creating a profile website with GitHub Pages. 


## Tips for Updating the Content of this site

- sidebar variables are defined in `info-.yml` 
- sidebar formatting for sidebar is in `_templates/hello.html` 
- variables are used via `html_context`
- get social links back by removing setting to `navbar_end` in `conf.py` and set values by [example](https://github.com/choldgraf/choldgraf.github.io/blob/main/conf.py#L41)

## References and help

- Open in a CodeSpace, [the first time, or after not using it for a while](https://docs.github.com/en/codespaces/developing-in-a-codespace/creating-a-codespace-for-a-repository#creating-a-codespace-for-a-repository) or [returning to one](https://docs.github.com/en/codespaces/developing-in-a-codespace/opening-an-existing-codespace#resuming-a-codespace-from-a-repository-page). *these links go to the GitHub docs so they stay the correct instructions even if GitHub changes*
- You can also [use the full devcontainer](https://code.visualstudio.com/docs/devcontainers/containers) locally. 
- If in a codespace or locally after installing the CodeTour extension
- See the [workshop materials website](https://ml4sts-outreach.github.io/profile/).  This may get updates and more information added to it, but the references will remain accurate. 
- If you get really stuck, you can @ mention  Dr. Brown(brownsarahm) in an issue on your repo.  She  may be slow at times, but will generally reply. **this is better than email for her**

## Working in the configured codespace

The code space is pre-configured to install python, all of the website's build dependencies, and start running the live builder. 
It also installs the code tour VSCode extension, so that you can use these as an additional type of documentation. 

Use accept the port forwarding and open the forwarded port in a new browser tab to preview your site while you work. 

For the workshop you will not need to, but later, you can change the setup by editing the `.devcontainer/devcontainer.json`

## To work with this repo offline 

**This requires having python installed then installs a package that helps build the website**

The base dependencies can be installed with 
```
pip install -r requirements.txt
```

The easiest way to build the website is to use `nox`, which handles all of the environment generation automatically.
To do so, follow these steps:

1. Install `nox`.

   ```shell
   pip install -U nox
   ```
2. To run a live webserver that will auto-build and reload when you make changes, run:

   ```shell
   nox -s docs-live
   ```


<!-- 
Run `nox`

   ```shell
   nox -s docs
   ```

this should install a Sphinx environment and build the site, putting the output files in `_build/html`. -->
## About this repo

- the `_resources` folder is templates for some common types of pages you might want to add