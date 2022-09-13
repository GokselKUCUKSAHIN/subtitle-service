import {getSubtitles} from 'youtube-captions-scraper';
import {undefCheck} from "undef-check";
import {getYoutubeIdfunction} from "./get-youtube-id";

const LANG_LIST: readonly string[] = ["en", "tr", "de", "fr"];

interface Subtitle {
    start: string | number;
    dur: string | number;
    text: string
}

export async function getYouTubeSubtitle(youtubeURL: string, lang = "en", array = false, seperator: string = " "): Promise<string | string[]> {
    undefCheck(youtubeURL, "You need to provide a YouTube URL!");
    const youtubeID: string | null = getYoutubeIdfunction(youtubeURL);
    if (youtubeID === null) throw Error("Please enter a proper YouTube link!");
    if (!LANG_LIST.includes(lang)) throw Error("Unsupported Language!");
    const captions = await getSubtitles({
        videoID: youtubeID,
        lang: lang
    });
    const subtitleList = convertCaptions(captions);
    return array ? subtitleList.join(seperator) : subtitleList;
}

function convertCaptions(subtitles: Subtitle[]): string[] {
    undefCheck(subtitles, "Empty Subtitle Error!");
    return subtitles.map(sub => sub.text);
}

(async _ => {
    const result = await getYouTubeSubtitle("https://www.youtube.com/watch?v=QXjU9qTsYCc&t=84s", "en")
    console.log(result);
})()