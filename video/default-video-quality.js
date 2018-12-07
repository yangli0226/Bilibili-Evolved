(() =>
{
    return (settings, resources) =>
    {
        (async () =>
        {
            const qualities = [
                {
                    name: "1080P60",
                    value: 116,
                },
                {
                    name: "1080P+",
                    value: 112,
                },
                {
                    name: "1080P",
                    value: 80
                },
                {
                    name: "720P",
                    value: 64
                },
                {
                    name: "480P",
                    value: 32
                },
                {
                    name: "360P",
                    value: 15
                },
                {
                    name: "自动",
                    value: 0
                },
            ];
            const dropdown = await SpinQuery.any(
                () => $(".gui-settings-dropdown:has(input[key=defaultVideoQuality])"));
            const list = dropdown.find("ul");
            const input = dropdown.find("input");
            qualities.forEach(item =>
                {
                    $(`<li>${item.name}</li>`).appendTo(list)
                        .on("click", () =>
                        {
                            input.val(item.name).trigger("input").change();
                        });
                });

            const qualityItems = await SpinQuery.condition(
                () => $(".bilibili-player-video-quality-menu .bui-select-list>li.bui-select-item"),
                it => it.length > 0 && $("li.profile-info").length > 0
            );
            const [availableHighestQualities] = qualityItems.toArray()
                .map(it => it.getAttribute("data-value"))
                .sort()
                .reverse();
            const [targetQuality] = qualities
                .filter(it => it.name === settings.defaultVideoQuality)
                .map(it => it.value);
            const [finalQuality] = qualities
                .map(it => it.value)
                .filter(it => it <= Math.min(targetQuality, availableHighestQualities))
                .sort()
                .reverse();

            qualityItems.each((_, it) =>
            {
                if (parseInt(it.getAttribute("data-value")) === finalQuality)
                {
                    it.click();
                }
            });
        })();
    };
})();