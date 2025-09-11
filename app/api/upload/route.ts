import { NextResponse } from 'next/server';
import { api, ApiError } from '../api';
import { cookies } from 'next/headers';


export async function POST(request: Request) {
  const cookieStore = await cookies();
  try {
	  const formData = await request.formData();


	  const { data } = await api.post('/upload', formData, {
	    headers: {
	      Cookie: cookieStore.toString(),
	    },
	  });


    return NextResponse.json(data);


  } catch (error) {
    return NextResponse.json(
      {
        error: (error as ApiError).response?.data?.error ?? (error as ApiError).message,
      },
      { status: (error as ApiError).status }
    )
  }
}