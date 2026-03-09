import type {
  NominatimResult,
  AddressSuggestion,
} from "@/features/nuevo-suceso/types";

class NominatimService {
  private readonly baseUrl = "https://nominatim.openstreetmap.org";
  private cache = new Map<string, AddressSuggestion[]>();
  private lastRequestTime = 0;
  private readonly minRequestInterval = 1000; // 1 segundo entre requests

  private async waitIfNeeded(): Promise<void> {
    const now = Date.now();
    const timeSinceLastRequest = now - this.lastRequestTime;

    if (timeSinceLastRequest < this.minRequestInterval) {
      await new Promise((resolve) =>
        setTimeout(resolve, this.minRequestInterval - timeSinceLastRequest),
      );
    }

    this.lastRequestTime = Date.now();
  }

  async searchAddresses(query: string): Promise<AddressSuggestion[]> {
    if (!query || query.length < 3) {
      return [];
    }

    // Check cache first
    const cacheKey = query.toLowerCase().trim();
    if (this.cache.has(cacheKey)) {
      return this.cache.get(cacheKey)!;
    }

    await this.waitIfNeeded();

    try {
      const params = new URLSearchParams({
        q: query,
        format: "json",
        addressdetails: "1",
        limit: "5",
        countrycodes: "ar", // Limitar a Argentina
        "accept-language": "es",
      });

      const response = await fetch(
        `${this.baseUrl}/search?${params.toString()}`,
        {
          headers: {
            "User-Agent": "CCR-JST/1.0 (geocoding@ccr-jst.gob.ar)",
          },
        },
      );

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const results: NominatimResult[] = await response.json();

      const suggestions: AddressSuggestion[] = results.map((result) => ({
        display_name: result.display_name,
        lat: parseFloat(result.lat),
        lon: parseFloat(result.lon),
        address: {
          road: result.address.road,
          house_number: result.address.house_number,
          suburb: result.address.suburb,
          city: result.address.city,
          state: result.address.state,
          postcode: result.address.postcode,
        },
      }));

      // Cache the results
      this.cache.set(cacheKey, suggestions);

      return suggestions;
    } catch (error) {
      console.error("Error searching addresses:", error);
      return [];
    }
  }
}

export const nominatimService = new NominatimService();
