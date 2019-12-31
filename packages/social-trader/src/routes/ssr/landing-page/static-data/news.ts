export type TNews = {
  title: string;
  text: string;
  tag?: string;
  url?: string;
};

export const newsItems: TNews[] = [
  {
    title: "Genesis Vision 2.0",
    text: "Long awaited update released",
    tag: "Hot",
    url: "https://blog.genesis.vision/genesis-vision-2-0-e8471c73e1be"
  },
  {
    title: "Genesis Vision",
    text: "Behind the scenes at GenesisVision",
    url: "https://twitter.com/genesis_vision/status/1205432776973004800"
  },
  {
    title: "Genesis Markets",
    text: "Genesis Markets updates symbols",
    url: "https://blog.genesis.vision/genesis-markets-update-677bd6dbc5f6"
  },
  {
    title: "Genesis Vision",
    text: "B2Broker partnership details",
    url: "https://blog.genesis.vision/b2broker-partnership-c9442a59486f"
  }
];
