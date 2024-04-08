import { useEffect, useState } from "react";

interface Index {
    start: number;
    end: number;
    sentiment: string;
    topic: string;
}

const ReviewHighlighter = ({ content, analytics }: { content: string, analytics: any[] }) => {
    const [indices, setIndices] = useState<Index[]>([]);

    useEffect(() => {
        let newIndices: Index[] = [];
        analytics.forEach(analytic => {
            const topic = analytic.topic;
            analytic.highlight_indices.forEach((indice: [number, number, string]) => {
                const [start, end, sentiment] = indice;
                if (!indices.some(idx => idx.start === start && idx.end === end)) {
                    newIndices.push({ start, end, sentiment, topic });
                }
            });
        });

        setIndices(prevIndices => {
            const filteredIndices = newIndices.filter(newIndex =>
                !prevIndices.some(prevIndex =>
                    prevIndex.start === newIndex.start && prevIndex.end === newIndex.end
                )
            );
            return [...prevIndices, ...filteredIndices];
        });
    }, [analytics, indices]);

    const getColorCode = (sentiment: string) => {
        switch (sentiment) {
            case "Positive":
                return "#D9F2DD";
            case "Negative":
                return "#F2DBD9";
            case "Mixed":
                return "#e8bd6d3d";
            case "Neutral":
                return "#eaf09b6b";
            default:
                return "#FFFFFF";
        }
    };

    const highlightContent = () => {
        let highlightedContent = [];
        let currentPosition = 0;

        indices.sort((a, b) => a.start - b.start);

        indices.forEach((idx, index) => {
            const { start, end, sentiment, topic } = idx;
            const highlightColor = getColorCode(sentiment);

            if (currentPosition < start) {
                highlightedContent.push(content.substring(currentPosition, start));
            }

            highlightedContent.push(
                <span
                    key={index}
                    style={{ backgroundColor: highlightColor }}
                    title={topic}
                >
                    {content.substring(start, end)}
                </span>
            );

            currentPosition = end;
        });

        if (currentPosition < content.length) {
            highlightedContent.push(content.substring(currentPosition));
        }

        return highlightedContent;
    };

    return (
        <div>
            {highlightContent()}
        </div>
    );
};

export default ReviewHighlighter;
