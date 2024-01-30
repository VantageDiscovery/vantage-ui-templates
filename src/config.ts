import {
  Filter,
  ClientConfiguration,
  EDemoTemplate,
  ECustomerAPIType,
  EFiltersType,
} from "abstracts";
import { VibeBoard } from "abstracts/VibeTypes";
import axios from "axios";
import { GetConfigurationWithDefaultValues } from "transformers/ConfigurationTransformer";

const removeTags = (text: string) => {
  if (text === null || text === "") return "";
  else text = text.toString();

  // Regular expression to identify HTML tags in
  // the input string. Replacing the identified
  // HTML tag with a null string.
  return text.replace(/(<([^>]+)>)/gi, "");
};

/**
 * Override this function to retrieve your filters from 3rd party, local folder or anywhere you like. Do not change the return type.
 *
 * @returns {Filter[]} The list of filters which are available in the UI.
 */
const getFilters = (): Promise<Filter[]> => {
  //return Promise.resolve([]);
  return Promise.resolve([
    {
      categorySlug: "category2",
      categoryName: "category",
      name: "Action Figure Playsets (9)",
      slug: "Action Figure Playsets",
    },
    {
      categorySlug: "category2",
      categoryName: "category",
      name: "Action Figures (1)",
      slug: "Action Figures",
    },
    {
      categorySlug: "category2",
      categoryName: "category",
      name: "Adult Accessories (1)",
      slug: "Adult Accessories",
    },
    {
      categorySlug: "category2",
      categoryName: "category",
      name: "All Book Genres (119)",
      slug: "All Book Genres",
    },
    {
      categorySlug: "category2",
      categoryName: "category",
      name: "Amplifiers & Effects Accessories (1)",
      slug: "Amplifiers & Effects Accessories",
    },
    {
      categorySlug: "category2",
      categoryName: "category",
      name: "Armoires & Wardrobes (52)",
      slug: "Armoires & Wardrobes",
    },
    {
      categorySlug: "category2",
      categoryName: "category",
      name: "Baby Dolls (6)",
      slug: "Baby Dolls",
    },
    {
      categorySlug: "category2",
      categoryName: "category",
      name: "Baby Proofing (1)",
      slug: "Baby Proofing",
    },
    {
      categorySlug: "category2",
      categoryName: "category",
      name: "Bakers' Racks & Pantry Cabinets (148)",
      slug: "Bakers' Racks & Pantry Cabinets",
    },
    {
      categorySlug: "category2",
      categoryName: "category",
      name: "Bar & Wine Tools (1)",
      slug: "Bar & Wine Tools",
    },
    {
      categorySlug: "category2",
      categoryName: "category",
      name: "Bar Carts (227)",
      slug: "Bar Carts",
    },
    {
      categorySlug: "category2",
      categoryName: "category",
      name: "Bar Stools & Counter Stools (2759)",
      slug: "Bar Stools & Counter Stools",
    },
    {
      categorySlug: "category2",
      categoryName: "category",
      name: "Bars & Wine Racks (380)",
      slug: "Bars & Wine Racks",
    },
    {
      categorySlug: "category2",
      categoryName: "category",
      name: "Bed Frames (260)",
      slug: "Bed Frames",
    },
    {
      categorySlug: "category2",
      categoryName: "category",
      name: "Bedroom Sets & Collections (248)",
      slug: "Bedroom Sets & Collections",
    },
    {
      categorySlug: "category2",
      categoryName: "category",
      name: "Beds (1173)",
      slug: "Beds",
    },
    {
      categorySlug: "category2",
      categoryName: "category",
      name: "Book Pre-orders (11)",
      slug: "Book Pre-orders",
    },
    {
      categorySlug: "category2",
      categoryName: "category",
      name: "Bookshelves & Bookcases (1364)",
      slug: "Bookshelves & Bookcases",
    },
    {
      categorySlug: "category2",
      categoryName: "category",
      name: "Camping Chairs & Furniture (1)",
      slug: "Camping Chairs & Furniture",
    },
    {
      categorySlug: "category2",
      categoryName: "category",
      name: "Car Cleaning (1)",
      slug: "Car Cleaning",
    },
    {
      categorySlug: "category2",
      categoryName: "category",
      name: "Cat Health & Grooming (1)",
      slug: "Cat Health & Grooming",
    },
    {
      categorySlug: "category2",
      categoryName: "category",
      name: "Cat Litter & Supplies (8)",
      slug: "Cat Litter & Supplies",
    },
    {
      categorySlug: "category2",
      categoryName: "category",
      name: "Cat Scratchers, Trees & Towers (1)",
      slug: "Cat Scratchers, Trees & Towers",
    },
    {
      categorySlug: "category2",
      categoryName: "category",
      name: "Chair Pads (15)",
      slug: "Chair Pads",
    },
    {
      categorySlug: "category2",
      categoryName: "category",
      name: "Chairs (1923)",
      slug: "Chairs",
    },
    {
      categorySlug: "category2",
      categoryName: "category",
      name: "Cleaning Tools (3)",
      slug: "Cleaning Tools",
    },
    {
      categorySlug: "category2",
      categoryName: "category",
      name: "Coat Racks (262)",
      slug: "Coat Racks",
    },
    {
      categorySlug: "category2",
      categoryName: "category",
      name: "Coffee Tables (1426)",
      slug: "Coffee Tables",
    },
    {
      categorySlug: "category2",
      categoryName: "category",
      name: "Console Tables (1031)",
      slug: "Console Tables",
    },
    {
      categorySlug: "category2",
      categoryName: "category",
      name: "Couch Covers & Furniture Covers (35)",
      slug: "Couch Covers & Furniture Covers",
    },
    {
      categorySlug: "category2",
      categoryName: "category",
      name: "Daybeds & Chaise Lounges (453)",
      slug: "Daybeds & Chaise Lounges",
    },
    {
      categorySlug: "category2",
      categoryName: "category",
      name: "Decorative Objects & Sculptures (1)",
      slug: "Decorative Objects & Sculptures",
    },
    {
      categorySlug: "category2",
      categoryName: "category",
      name: "Decorative Storage (3)",
      slug: "Decorative Storage",
    },
    {
      categorySlug: "category2",
      categoryName: "category",
      name: "Desks (2489)",
      slug: "Desks",
    },
    {
      categorySlug: "category2",
      categoryName: "category",
      name: "Dining Chairs & Benches (1910)",
      slug: "Dining Chairs & Benches",
    },
    {
      categorySlug: "category2",
      categoryName: "category",
      name: "Dining Room Sets & Collections (1484)",
      slug: "Dining Room Sets & Collections",
    },
    {
      categorySlug: "category2",
      categoryName: "category",
      name: "Dining Tables (1153)",
      slug: "Dining Tables",
    },
    {
      categorySlug: "category2",
      categoryName: "category",
      name: "Dog Beds (1)",
      slug: "Dog Beds",
    },
    {
      categorySlug: "category2",
      categoryName: "category",
      name: "Doll Clothes & Accessories (95)",
      slug: "Doll Clothes & Accessories",
    },
    {
      categorySlug: "category2",
      categoryName: "category",
      name: "Doll Furniture (17)",
      slug: "Doll Furniture",
    },
    {
      categorySlug: "category2",
      categoryName: "category",
      name: "Doll Playsets (13)",
      slug: "Doll Playsets",
    },
    {
      categorySlug: "category2",
      categoryName: "category",
      name: "Dollhouses (3)",
      slug: "Dollhouses",
    },
    {
      categorySlug: "category2",
      categoryName: "category",
      name: "Dressers (621)",
      slug: "Dressers",
    },
    {
      categorySlug: "category2",
      categoryName: "category",
      name: "Easels & Activity Tables (1)",
      slug: "Easels & Activity Tables",
    },
    {
      categorySlug: "category2",
      categoryName: "category",
      name: "End & Side Tables (3329)",
      slug: "End & Side Tables",
    },
    {
      categorySlug: "category2",
      categoryName: "category",
      name: "Fashion Dolls (5)",
      slug: "Fashion Dolls",
    },
    {
      categorySlug: "category2",
      categoryName: "category",
      name: "Filing Cabinets (520)",
      slug: "Filing Cabinets",
    },
    {
      categorySlug: "category2",
      categoryName: "category",
      name: "Folding Tables & Chairs (325)",
      slug: "Folding Tables & Chairs",
    },
    {
      categorySlug: "category2",
      categoryName: "category",
      name: "Furniture Deals (3)",
      slug: "Furniture Deals",
    },
    {
      categorySlug: "category2",
      categoryName: "category",
      name: "Futons (5)",
      slug: "Futons",
    },
    {
      categorySlug: "category2",
      categoryName: "category",
      name: "Hammocks (588)",
      slug: "Hammocks",
    },
    {
      categorySlug: "category2",
      categoryName: "category",
      name: "Hardware (10)",
      slug: "Hardware",
    },
    {
      categorySlug: "category2",
      categoryName: "category",
      name: "Headboards (528)",
      slug: "Headboards",
    },
    {
      categorySlug: "category2",
      categoryName: "category",
      name: "Heaters (1)",
      slug: "Heaters",
    },
    {
      categorySlug: "category2",
      categoryName: "category",
      name: "Home Office Furniture Accessories (341)",
      slug: "Home Office Furniture Accessories",
    },
    {
      categorySlug: "category2",
      categoryName: "category",
      name: "Home Office Sets & Collections (164)",
      slug: "Home Office Sets & Collections",
    },
    {
      categorySlug: "category2",
      categoryName: "category",
      name: "Home Renovation (1)",
      slug: "Home Renovation",
    },
    {
      categorySlug: "category2",
      categoryName: "category",
      name: "Indoor Christmas Decorations (1)",
      slug: "Indoor Christmas Decorations",
    },
    {
      categorySlug: "category2",
      categoryName: "category",
      name: "Irons, Steamers & Accessories (1)",
      slug: "Irons, Steamers & Accessories",
    },
    {
      categorySlug: "category2",
      categoryName: "category",
      name: "Jewelry Armoires (58)",
      slug: "Jewelry Armoires",
    },
    {
      categorySlug: "category2",
      categoryName: "category",
      name: "Kids' Books (8)",
      slug: "Kids' Books",
    },
    {
      categorySlug: "category2",
      categoryName: "category",
      name: "Kids' Furniture (61)",
      slug: "Kids' Furniture",
    },
    {
      categorySlug: "category2",
      categoryName: "category",
      name: "Kitchen Carts & Islands (402)",
      slug: "Kitchen Carts & Islands",
    },
    {
      categorySlug: "category2",
      categoryName: "category",
      name: "Lamps & Lighting (49)",
      slug: "Lamps & Lighting",
    },
    {
      categorySlug: "category2",
      categoryName: "category",
      name: "Living Room Sets & Collections (252)",
      slug: "Living Room Sets & Collections",
    },
    {
      categorySlug: "category2",
      categoryName: "category",
      name: "Loveseats (265)",
      slug: "Loveseats",
    },
    {
      categorySlug: "category2",
      categoryName: "category",
      name: "Modern Decor (4)",
      slug: "Modern Decor",
    },
    {
      categorySlug: "category2",
      categoryName: "category",
      name: "New Books (2)",
      slug: "New Books",
    },
    {
      categorySlug: "category2",
      categoryName: "category",
      name: "Nightstands (665)",
      slug: "Nightstands",
    },
    {
      categorySlug: "category2",
      categoryName: "category",
      name: "Nintendo Switch Games (1)",
      slug: "Nintendo Switch Games",
    },
    {
      categorySlug: "category2",
      categoryName: "category",
      name: "Non-Fiction (28)",
      slug: "Non-Fiction",
    },
    {
      categorySlug: "category2",
      categoryName: "category",
      name: "Nursery Furniture (8)",
      slug: "Nursery Furniture",
    },
    {
      categorySlug: "category2",
      categoryName: "category",
      name: "Office Chairs (1561)",
      slug: "Office Chairs",
    },
    {
      categorySlug: "category2",
      categoryName: "category",
      name: "Ottomans & Benches (2141)",
      slug: "Ottomans & Benches",
    },
    {
      categorySlug: "category2",
      categoryName: "category",
      name: "Outdoor Benches (294)",
      slug: "Outdoor Benches",
    },
    {
      categorySlug: "category2",
      categoryName: "category",
      name: "Outdoor Heating Accessories (6)",
      slug: "Outdoor Heating Accessories",
    },
    {
      categorySlug: "category2",
      categoryName: "category",
      name: "Outdoor Ottomans & Poufs (64)",
      slug: "Outdoor Ottomans & Poufs",
    },
    {
      categorySlug: "category2",
      categoryName: "category",
      name: "Outdoor Sectionals (332)",
      slug: "Outdoor Sectionals",
    },
    {
      categorySlug: "category2",
      categoryName: "category",
      name: "Outdoor Sofas & Loveseats (188)",
      slug: "Outdoor Sofas & Loveseats",
    },
    {
      categorySlug: "category2",
      categoryName: "category",
      name: "Packaging Supplies (1)",
      slug: "Packaging Supplies",
    },
    {
      categorySlug: "category2",
      categoryName: "category",
      name: "Patio Bars & Carts (62)",
      slug: "Patio Bars & Carts",
    },
    {
      categorySlug: "category2",
      categoryName: "category",
      name: "Patio Chairs (1986)",
      slug: "Patio Chairs",
    },
    {
      categorySlug: "category2",
      categoryName: "category",
      name: "Patio Furniture Covers (109)",
      slug: "Patio Furniture Covers",
    },
    {
      categorySlug: "category2",
      categoryName: "category",
      name: "Patio Sets (2000)",
      slug: "Patio Sets",
    },
    {
      categorySlug: "category2",
      categoryName: "category",
      name: "Patio Tables (586)",
      slug: "Patio Tables",
    },
    {
      categorySlug: "category2",
      categoryName: "category",
      name: "Picture Frames (2)",
      slug: "Picture Frames",
    },
    {
      categorySlug: "category2",
      categoryName: "category",
      name: "Play Tents (1)",
      slug: "Play Tents",
    },
    {
      categorySlug: "category2",
      categoryName: "category",
      name: "Presentation Boards (1)",
      slug: "Presentation Boards",
    },
    {
      categorySlug: "category2",
      categoryName: "category",
      name: "Protection Plans (11)",
      slug: "Protection Plans",
    },
    {
      categorySlug: "category2",
      categoryName: "category",
      name: "Room Dividers (545)",
      slug: "Room Dividers",
    },
    {
      categorySlug: "category2",
      categoryName: "category",
      name: "Rugs (1)",
      slug: "Rugs",
    },
    {
      categorySlug: "category2",
      categoryName: "category",
      name: "Sectional Sofas (222)",
      slug: "Sectional Sofas",
    },
    {
      categorySlug: "category2",
      categoryName: "category",
      name: "Sideboards & Buffet Tables (398)",
      slug: "Sideboards & Buffet Tables",
    },
    {
      categorySlug: "category2",
      categoryName: "category",
      name: "Small Space Patio Furniture (28)",
      slug: "Small Space Patio Furniture",
    },
    {
      categorySlug: "category2",
      categoryName: "category",
      name: "Sofa Beds (7)",
      slug: "Sofa Beds",
    },
    {
      categorySlug: "category2",
      categoryName: "category",
      name: "Sofas & Couches (487)",
      slug: "Sofas & Couches",
    },
    {
      categorySlug: "category2",
      categoryName: "category",
      name: "Statement Furniture (10)",
      slug: "Statement Furniture",
    },
    {
      categorySlug: "category2",
      categoryName: "category",
      name: "Storage Bins & Boxes (1)",
      slug: "Storage Bins & Boxes",
    },
    {
      categorySlug: "category2",
      categoryName: "category",
      name: "Storage Furniture (1504)",
      slug: "Storage Furniture",
    },
    {
      categorySlug: "category2",
      categoryName: "category",
      name: "Swimming Pools (2)",
      slug: "Swimming Pools",
    },
    {
      categorySlug: "category2",
      categoryName: "category",
      name: "TV Stands & Entertainment Centers (1492)",
      slug: "TV Stands & Entertainment Centers",
    },
    {
      categorySlug: "category2",
      categoryName: "category",
      name: "Teens' Books (1)",
      slug: "Teens' Books",
    },
    {
      categorySlug: "category2",
      categoryName: "category",
      name: "Vanities (134)",
      slug: "Vanities",
    },
    {
      categorySlug: "category2",
      categoryName: "category",
      name: "Vinyl Records (1)",
      slug: "Vinyl Records",
    },
    {
      categorySlug: "category2",
      categoryName: "category",
      name: "Wall Decor (10)",
      slug: "Wall Decor",
    },
  ]);
};

const getBoards = async (): Promise<VibeBoard[]> => {
  return axios
    .get("./data/pins-data.json")
    .then((response) => response.data.boards);
};

const configuration: ClientConfiguration = {
  template: EDemoTemplate.PRODUCT, // default product
  accountId: "nick-demo-b",
  defaultAccuracy: "1.0",
  defaultSearchQuery: "put your legs up and relax",
  collectionId: "target-jan22",
  apiKey: "$2a$10$/l75KK.OjPaaE2mTIyCGkeSiuLbzygATAYEzgHoFrplcpzPoqjv5C",
  vantageSearchURL: "https://api.demo-b.vantagediscovery.com/v1/search",
  customerAPI: {
    type: ECustomerAPIType.VANTAGE_API,
    apiKey: "7007e420-946f-4aae-8992-bc41ae59ed1d", //key of api for path below
    apiPath: "https://demo-api.dev-a.dev.vantagediscovery.com/api/v1/items",
    collectionPrefix: "target-jan22",
    accountPrefix: "nick-demo-b",
    getFilters: getFilters,
  },
  filter: {
    type: EFiltersType.SINGLE_SELECT,
  },
  customFieldTransformer: {
    imageSrc: { fieldName: "noopMeta.image_url" },
    description: { fieldName: "noopMeta.description", transformer: removeTags },
    title: { fieldName: "noopMeta.title" },
    embeddingText: { fieldName: "noopMeta.text" },
    externalUrl: { fieldName: "noopMeta.url" },
  },
  branding: {
    pageTitle: "Sofa So Good!",
    logoUrl: new URL("/src/icons/sofa-so-good.png", import.meta.url).href,
  },
  vibe: {
    getBoards: getBoards,
    vibe_overall_weight: 0.25,
  },
};

export default GetConfigurationWithDefaultValues(configuration);
