import { NextResponse } from 'next/server';
import { getPriceTrendForCard } from '@/lib/price-trends';

export async function GET(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  const externalId = (await params).id;

  if (!externalId) {
    return NextResponse.json({ data: null }, { status: 200 });
  }

  const { searchParams } = new URL(request.url);
  const name = searchParams.get('name') ?? '';
  const setName = searchParams.get('setName') ?? '';
  const cardNumber = searchParams.get('cardNumber') ?? '';
  const variant = searchParams.get('variant');

  if (!name || !setName || !cardNumber) {
    return NextResponse.json({ data: null }, { status: 200 });
  }

  try {
    const data = await getPriceTrendForCard(externalId, {
      name,
      setName,
      cardNumber,
      variant,
    });
    return NextResponse.json({ data }, { status: 200 });
  } catch (error) {
    console.error('Price trend lookup error:', error);
    return NextResponse.json({ data: null }, { status: 200 });
  }
}
