import nox

nox.options.reuse_existing_virtualenvs = True

@nox.session(name='docs')
def docs(session):
    session.install('-r', 'requirements.txt')
    session.run(*'sphinx-build -nW -b dirhtml . _build/dirhtml'.split())
    session.log("open ./_build/dirhtml}/index.html")

@nox.session(name="docs-live")
def docs_live(session):
    session.install('-r', 'requirements.txt')
    session.run(*'sphinx-autobuild -nW . _build/dirhtml'.split())

#
# @nox.session(name="docs-live")
# def docs_live(session):
#     session.install('-r', 'requirements.txt')
#     session.run(*'sphinx-build -nW --keep-going -b dirhtml . _build/dirhtml'.split())
