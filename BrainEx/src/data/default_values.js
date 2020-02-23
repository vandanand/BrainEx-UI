/* build option defaults */
const MAX = 100; // todo get this from API return
export const default_dv = "eu";
export const default_st = 0.1;
export const default_loi = [0, MAX]; //todo this might might not happen here because of the max call
export const default_sv = true;
export const default_nw = 5;
export const default_dm = 16;
export const default_mrm = 16;

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