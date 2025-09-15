exports.bookingConfirmationTemplate = (
  userName,
  propertyDetails,
  checkInDate,
  checkOutDate
) => {
  return `
  <div style="font-family: Arial, sans-serif; max-width: 600px; margin: auto; border: 1px solid #e0e0e0; border-radius: 10px; overflow: hidden;">
    <div style="background: #4CAF50; color: #fff; padding: 20px; text-align: center;">
      <h1 style="margin: 0;">AuraStay</h1>
      <p style="margin: 0;">Your trusted stay partner</p>
    </div>
    <div style="padding: 20px; color: #333;">
      <h2>Hello ${userName},</h2>
      <p>🎉 Thank you for your booking! We’re excited to host you.</p>
      
      <h3 style="border-bottom: 1px solid #ddd; padding-bottom: 5px;">Booking Details:</h3>
      <ul style="list-style: none; padding: 0;">
        <li><strong>🏨 Property:</strong> ${propertyDetails}</li>
        <li><strong>📅 Check-in:</strong> ${new Date(
          checkInDate
        ).toDateString()}</li>
        <li><strong>📅 Check-out:</strong> ${new Date(
          checkOutDate
        ).toDateString()}</li>
      </ul>

      <div style="text-align: center; margin: 20px 0;">
        <a href="https://yourdomain.com/my-bookings" 
           style="background: #4CAF50; color: white; padding: 12px 20px; text-decoration: none; border-radius: 5px; font-weight: bold;">
          View My Booking
        </a>
      </div>

      <p>If you have any questions, reply to this email or reach out to our <a>support team</a>.</p>
    </div>
    <div style="background: #f4f4f4; padding: 10px; text-align: center; font-size: 12px; color: #777;">
      © 2025 AuraStay · All Rights Reserved
    </div>
  </div>
  `;
};
exports.paymentConfirmationTemplate = (userName, propertyDetails, amount) => {
  return `
  <div style="font-family: Arial, sans-serif; max-width: 600px; margin: auto; border: 1px solid #e0e0e0; border-radius: 10px; overflow: hidden;">
    <div style="background: #2196F3; color: #fff; padding: 20px; text-align: center;">
      <h1 style="margin: 0;">AuraStay</h1>
      <p style="margin: 0;">Payment Successful</p>
    </div>
    <div style="padding: 20px; color: #333;">
      <h2>Hello ${userName},</h2>
      <p>✅ Your payment has been processed successfully.</p>
      
      <h3 style="border-bottom: 1px solid #ddd; padding-bottom: 5px;">Payment Details:</h3>
      <ul style="list-style: none; padding: 0;">
        <li><strong>💵 Amount Paid:</strong> ₹${amount}</li>
        <li><strong>🏨 Property:</strong> ${propertyDetails}</li>
      </ul>

      <div style="text-align: center; margin: 20px 0;">
        <a 
           style="background: #2196F3; color: white; padding: 12px 20px; text-decoration: none; border-radius: 5px; font-weight: bold;">
          View Booking
        </a>
      </div>

      <p>Thank you for choosing us! We can’t wait to welcome you soon.</p>
    </div>
    <div style="background: #f4f4f4; padding: 10px; text-align: center; font-size: 12px; color: #777;">
      © 2025 AuraStay · All Rights Reserved
    </div>
  </div>
  `;
};

