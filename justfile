mod? digabi2-companion-app

gh := require("gh")
jq := require("jq")

build: fetch
    @just digabi2-companion-app build

dev-release version: fetch
    @just digabi2-companion-app dev-release "{{ version }}"

prod-release: fetch
    @just digabi2-companion-app prod-release

submodule-init: fetch
    @just digabi2-companion-app submodule-init

submodule-update: fetch
    @just digabi2-companion-app submodule-update

[private]
fetch:
    @{{ gh }} api repos/digabi/digabi2-companion-app-shared/contents/digabi2-companion-app.just | \
    {{ jq }} -r '.download_url' | \
    wget --quiet --input-file - --output-document digabi2-companion-app.just
