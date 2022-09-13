export function getYoutubeIdfunction(url: string, opts?: { fuzzy: boolean }): string | null {
    if (opts === undefined) {
        opts = {fuzzy: true};
    }

    if (/youtu\.?be/.test(url)) {

        // Look first for known patterns

        const patterns = [
            /youtu\.be\/([^#\&\?]{11})/,  // youtu.be/<id>
            /\?v=([^#\&\?]{11})/,         // ?v=<id>
            /\&v=([^#\&\?]{11})/,         // &v=<id>
            /embed\/([^#\&\?]{11})/,      // embed/<id>
            /\/v\/([^#\&\?]{11})/         // /v/<id>
        ];

        // If any pattern matches, return the ID
        for (let i = 0; i < patterns.length; ++i) {
            if (patterns[i].test(url)) {
                const exec = patterns[i].exec(url);
                return exec ? exec[i] : null;
            }
        }

        if (opts.fuzzy) {
            // If that fails, break it apart by certain characters and look
            // for the 11 character key
            const tokens = url.split(/[\/\&\?=#\.\s]/g);
            for (let i = 0; i < tokens.length; ++i) {
                if (/^[^#\&\?]{11}$/.test(tokens[i])) {
                    return tokens[i];
                }
            }
        }
    }
    return null;
}