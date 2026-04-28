'use client';

import type { PriceTrendData, TierPrice } from '@/lib/price-trends';

interface PriceTrendDisplayProps {
  data: PriceTrendData | null;
  loading?: boolean;
}

function formatUsd(value: number | null): string {
  if (value == null) return '~';
  return `$${value.toFixed(2)}`;
}

function TrendArrow({ direction }: { direction: 'up' | 'down' | 'stable' }) {
  if (direction === 'up') {
    return (
      <svg className="inline h-4 w-4 text-green-400 ml-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M5 15l7-7 7 7" />
      </svg>
    );
  }
  if (direction === 'down') {
    return (
      <svg className="inline h-4 w-4 text-red-400 ml-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M19 9l-7 7-7-7" />
      </svg>
    );
  }
  return (
    <svg className="inline h-4 w-4 text-poke-slate ml-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M5 12h14" />
    </svg>
  );
}

function getTrendDirection(shortTerm: number | null, longTerm: number | null): 'up' | 'down' | 'stable' {
  if (shortTerm == null || longTerm == null || longTerm === 0) return 'stable';
  const ratio = shortTerm / longTerm;
  if (ratio > 1.05) return 'up';
  if (ratio < 0.95) return 'down';
  return 'stable';
}

function SourceRow({ label, tier, url }: { label: string; tier: TierPrice; url?: string | null }) {
  const shortTrend = getTrendDirection(tier.avg1d, tier.avg7d);
  const medTrend = getTrendDirection(tier.avg7d, tier.avg30d);

  return (
    <div className="space-y-1.5">
      <div className="flex items-center justify-between">
        {url ? (
          <a
            href={url}
            target="_blank"
            rel="noopener noreferrer"
            className="text-[10px] font-semibold uppercase tracking-wider text-poke-gold/80 hover:text-poke-gold transition-colors flex items-center gap-1"
          >
            {label}
            <svg className="h-2.5 w-2.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
            </svg>
          </a>
        ) : (
          <span className="text-[10px] font-semibold uppercase tracking-wider text-poke-slate/70">{label}</span>
        )}
        {tier.saleCount != null && (
          <span className="text-[10px] text-poke-slate/50">{tier.saleCount} sales</span>
        )}
      </div>
      <div className="flex items-baseline gap-2">
        <span className="text-lg font-bold text-poke-gold">{formatUsd(tier.avg)}</span>
        <span className="text-xs text-poke-slate">avg</span>
        {tier.low != null && (
          <>
            <span className="text-poke-slate/50 mx-0.5">·</span>
            <span className="text-xs text-poke-slate">{formatUsd(tier.low)} low</span>
          </>
        )}
      </div>
      <div className="flex items-center gap-3 text-xs">
        {tier.avg1d != null && (
          <div className="flex items-center">
            <span className="text-poke-slate mr-1">1d:</span>
            <span className="font-medium text-poke-white">{formatUsd(tier.avg1d)}</span>
            <TrendArrow direction={shortTrend} />
          </div>
        )}
        {tier.avg7d != null && (
          <div className="flex items-center">
            <span className="text-poke-slate mr-1">7d:</span>
            <span className="font-medium text-poke-white">{formatUsd(tier.avg7d)}</span>
            <TrendArrow direction={medTrend} />
          </div>
        )}
        {tier.avg30d != null && (
          <div className="flex items-center">
            <span className="text-poke-slate mr-1">30d:</span>
            <span className="font-medium text-poke-white">{formatUsd(tier.avg30d)}</span>
          </div>
        )}
      </div>
    </div>
  );
}

export default function PriceTrendDisplay({ data, loading }: PriceTrendDisplayProps) {
  if (loading) {
    return (
      <div className="space-y-3 animate-pulse mt-4">
        <div className="h-4 w-36 bg-poke-dark-lighter rounded"></div>
        <div className="h-8 w-56 bg-poke-dark-lighter rounded"></div>
        <div className="flex gap-4">
          <div className="h-5 w-20 bg-poke-dark-lighter rounded"></div>
          <div className="h-5 w-20 bg-poke-dark-lighter rounded"></div>
          <div className="h-5 w-20 bg-poke-dark-lighter rounded"></div>
        </div>
      </div>
    );
  }

  if (!data) return null;

  const hasEbay = data.ebay && data.ebay.avg != null;
  const hasTcgplayer = data.tcgplayer && data.tcgplayer.avg != null;

  if (!hasEbay && !hasTcgplayer) return null;

  return (
    <div className="mt-4 rounded-lg border border-poke-white/10 bg-poke-dark-lighter/50 p-4 space-y-4">
      <span className="text-xs font-semibold uppercase tracking-wider text-poke-slate">
        Market Trends (NM)
      </span>

      {hasTcgplayer && <SourceRow label="TCGPlayer" tier={data.tcgplayer!} url={data.tcgplayerUrl} />}
      {hasEbay && hasTcgplayer && <div className="border-t border-poke-white/5" />}
      {hasEbay && <SourceRow label="eBay Sold" tier={data.ebay!} url={data.ebaySearchUrl} />}
    </div>
  );
}
