/* build option defaults */
export const default_dv = "eu"; // default distance value (Euclidean)
export const default_st = 0.1; // default similarity threshold (0:1)
export const default_nw = 4; // default number of workers
export const default_sv = false; // default spark value (use spark v use python multi-threading
export const default_spark = false; // default "is spark installed correctly?"
export const default_dm = 16; // default driver memory (GB)
export const default_mrm = 16; // default max result memory (GB)
export const default_matches = 5;
export const excludeSameID = true;
export const default_overlap = 100;

/* data table defaults */
// for query result gradient:
export const top_color = "0000FF"; // blue
export const bottom_color = "FFA500"; // orange

/* file paths */
export const root = "/";
export const select_new_dataset = "/SelectNewDataset";
export const build_options = "/BuildOptions";
export const build_progress = "/BuildProgressMenu";
export const main_app = "/MainPage";
export const data_exp = "/MainPage/ExploreRawData";
export const cluster_exp = "/MainPage/ExploreClusters";
export const query_page = "/MainPage/QueryFinder";
