import { getSubtitles } from "youtube-captions-scraper";
import { undefCheck } from "undef-check";
import { getYoutubeID } from "./get-youtube-id";

const LANG_LIST: readonly string[] = ["en", "tr", "de", "fr"];

const youtubeIDRegEx = /([^#\&\?]{11})/;

interface Subtitle {
    start: string | number;
    dur: string | number;
    text: string;
}

function convertCaptions(subtitles: Subtitle[]): string[] {
    undefCheck(subtitles, "Empty Subtitle Error!");
    return subtitles.map((sub) => sub.text);
}

function getYoutubeIDFromURL(url: string) {
    const firstTry: string | null = getYoutubeID(url);
    if (!!firstTry) return firstTry;
    if (firstTry === null && youtubeIDRegEx.test(url)) return url;
    return null;
}

export async function getYouTubeSubtitle(
    youtubeURL: string,
    lang = "en",
    array = false,
    seperator: string = " "
): Promise<string | string[]> {
    undefCheck(youtubeURL, "You need to provide a YouTube URL!");
    const youtubeID: string | null = getYoutubeIDFromURL(youtubeURL);
    if (youtubeID === null) throw Error("Please enter a proper YouTube link!");
    if (!LANG_LIST.includes(lang)) throw Error("Unsupported Language!");
    const captions = await getSubtitles({
        videoID: youtubeID,
        lang: lang,
    });
    const subtitleList = convertCaptions(captions);
    return array ? subtitleList.join(seperator) : subtitleList;
}

(async (_) => {
    console.log(
        await getYouTubeSubtitle(
            "https://www.youtube.com/watch?v=1Z6CHioIn3s&list=RDMM&index=4"
        )
    );
})();