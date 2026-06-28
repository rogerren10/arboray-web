import { NextRequest, NextResponse } from "next/server";
import nodemailer from "nodemailer";

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const {
      name,
      organization,
      title,
      email,
      researchMicrobe,
      dataScale,
      hasStrainCollection,
      aiDirections,
      motivation,
    } = body;

    if (!name || !organization || !title || !email || !researchMicrobe || !dataScale || !aiDirections || aiDirections.length === 0) {
      return NextResponse.json(
        { error: "Missing required fields" },
        { status: 400 }
      );
    }

    const smtpHost = process.env.SMTP_HOST;
    const smtpPort = process.env.SMTP_PORT ? parseInt(process.env.SMTP_PORT) : 587;
    const smtpUser = process.env.SMTP_USER;
    const smtpPass = process.env.SMTP_PASS;
    const toEmail = process.env.CONTACT_EMAIL || "contact@tongguangai.cn";

    if (!smtpHost || !smtpUser || !smtpPass) {
      console.warn("SMTP environment variables not configured, simulating email send");
      console.log("Email would be sent to:", toEmail);
      console.log("Form data:", {
        name,
        organization,
        title,
        email,
        researchMicrobe,
        dataScale,
        hasStrainCollection,
        aiDirections,
        motivation,
      });
      return NextResponse.json({ success: true });
    }

    const transporter = nodemailer.createTransport({
      host: smtpHost,
      port: smtpPort,
      secure: smtpPort === 465,
      auth: {
        user: smtpUser,
        pass: smtpPass,
      },
    });

    const titleMap: Record<string, string> = {
      professor: "教授/研究员",
      associate: "副教授/副研究员",
      pi: "独立 PI",
      senior_engineer: "高级工程师",
      postdoc: "博士后",
      phd: "博士研究生",
    };

    const dataScaleMap: Record<string, string> = {
      lt10: "10 批次以下",
      "10-50": "10-50 批次",
      gt50: "50 批次以上",
    };

    const aiDirectionMap: Record<string, string> = {
      strain_mining: "智能菌株挖掘与匹配",
      function_prediction: "功能性状预测",
      genome_analysis: "基因组分析与注释",
      fermentation_optimization: "发酵工艺优化",
      compost_simulation: "堆肥过程模拟",
      microbiome_analysis: "微生物组数据分析",
    };

    const aiDirectionsText = aiDirections
      .map((d: string) => aiDirectionMap[d] || d)
      .join("、");

    const mailOptions = {
      from: `"桐光智能官网" <${smtpUser}>`,
      to: toEmail,
      replyTo: email,
      subject: `【青年科学家计划】新申请 - ${name} - ${organization}`,
      html: `
        <div style="font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px;">
          <div style="background: linear-gradient(135deg, #059669 0%, #0d9488 100%); padding: 24px; border-radius: 8px 8px 0 0;">
            <h2 style="color: white; margin: 0; font-size: 20px;">青年科学家启航计划 - 新申请</h2>
          </div>
          
          <div style="background: #f8fafc; padding: 24px; border-radius: 0 0 8px 8px; border: 1px solid #e2e8f0; border-top: none;">
            <h3 style="color: #0f172a; margin-top: 0; font-size: 16px;">基本信息</h3>
            <table style="width: 100%; border-collapse: collapse; margin-bottom: 20px;">
              <tr>
                <td style="padding: 8px 0; color: #64748b; width: 120px; vertical-align: top;">姓名</td>
                <td style="padding: 8px 0; color: #0f172a; font-weight: 500;">${name}</td>
              </tr>
              <tr>
                <td style="padding: 8px 0; color: #64748b; vertical-align: top;">单位</td>
                <td style="padding: 8px 0; color: #0f172a; font-weight: 500;">${organization}</td>
              </tr>
              <tr>
                <td style="padding: 8px 0; color: #64748b; vertical-align: top;">职称</td>
                <td style="padding: 8px 0; color: #0f172a; font-weight: 500;">${titleMap[title] || title}</td>
              </tr>
              <tr>
                <td style="padding: 8px 0; color: #64748b; vertical-align: top;">邮箱</td>
                <td style="padding: 8px 0; color: #059669; font-weight: 500;">
                  <a href="mailto:${email}" style="color: #059669;">${email}</a>
                </td>
              </tr>
            </table>

            <h3 style="color: #0f172a; margin-top: 24px; font-size: 16px;">研究方向与资产现状</h3>
            <table style="width: 100%; border-collapse: collapse; margin-bottom: 20px;">
              <tr>
                <td style="padding: 8px 0; color: #64748b; width: 120px; vertical-align: top;">核心研究方向</td>
                <td style="padding: 8px 0; color: #0f172a; font-weight: 500;">${researchMicrobe}</td>
              </tr>
              <tr>
                <td style="padding: 8px 0; color: #64748b; vertical-align: top;">数据规模</td>
                <td style="padding: 8px 0; color: #0f172a; font-weight: 500;">${dataScaleMap[dataScale] || dataScale}</td>
              </tr>
              <tr>
                <td style="padding: 8px 0; color: #64748b; vertical-align: top;">自有菌株库</td>
                <td style="padding: 8px 0; color: #0f172a; font-weight: 500;">${hasStrainCollection === "yes" ? "是" : "否"}</td>
              </tr>
            </table>

            <h3 style="color: #0f172a; margin-top: 24px; font-size: 16px;">合作诉求</h3>
            <table style="width: 100%; border-collapse: collapse; margin-bottom: 20px;">
              <tr>
                <td style="padding: 8px 0; color: #64748b; width: 120px; vertical-align: top;">AI 算力方向</td>
                <td style="padding: 8px 0; color: #0f172a; font-weight: 500;">${aiDirectionsText}</td>
              </tr>
              ${motivation ? `
              <tr>
                <td style="padding: 8px 0; color: #64748b; vertical-align: top;">申请动机</td>
                <td style="padding: 8px 0; color: #0f172a; font-weight: 500; white-space: pre-wrap;">${motivation}</td>
              </tr>
              ` : ""}
            </table>

            <div style="margin-top: 24px; padding-top: 16px; border-top: 1px solid #e2e8f0; text-align: center; color: #94a3b8; font-size: 12px;">
              此邮件来自桐光智能官网青年科学家计划申请表单
            </div>
          </div>
        </div>
      `,
    };

    await transporter.sendMail(mailOptions);

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Email send error:", error);
    return NextResponse.json(
      { error: "Failed to send email" },
      { status: 500 }
    );
  }
}
