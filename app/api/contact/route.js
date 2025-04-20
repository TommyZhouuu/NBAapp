import nodemailer from 'nodemailer';
import { NextResponse } from 'next/server';

export async function POST(req) {
  try {
    const { name, email, message } = await req.json();

    if (!name || !email || !message) {
      return NextResponse.json({ error: 'All fields are required' }, { status: 400 });
    }

    const transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: process.env.EMAIL_USER,     
        pass: process.env.EMAIL_PASS,     
      },
    });

    await transporter.sendMail({
      from: email,                       
      to: 'xzhou145@myseneca.ca',        
      subject: `Message from ${name}`,
      text: `Email: ${email}\n\nMessage:\n${message}`,
    });

    return NextResponse.json({ success: true });
  } catch (err) {
    console.error(err);
    return NextResponse.json({ error: 'Email failed to send' }, { status: 500 });
  }
}
