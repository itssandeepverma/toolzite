import Certificate from "../models/certificate.js";
import catchAsyncErrors from "../middlewares/catchAsyncErrors.js";
import ErrorHandler from "../utils/errorHandler.js";
import { upload_file } from "../utils/cloudinary.js";

const DEFAULT_CERTIFICATE = {
  certificateId: "TZ-INT-2026-00047",
  name: "Akash Vishwakarma",
  role: "Frontend Development Intern",
  duration: "38 Days",
  startDate: "20 March 2026",
  endDate: "27 April 2026",
  completionDate: "27 April 2026",
  issueDate: "05 May 2026",
  certificateImage: {
    url: "/images/TZ-INT-2026-00047.png",
    public_id: "",
  },
};

const normalizeCertificateId = (value = "") => value.toString().trim().toUpperCase();

const mapCertificate = (certificate) => ({
  id: certificate._id,
  certificateId: certificate.certificateId,
  name: certificate.name,
  role: certificate.role,
  duration: certificate.duration,
  startDate: certificate.startDate,
  endDate: certificate.endDate,
  completionDate: certificate.completionDate,
  issueDate: certificate.issueDate,
  certificateImage: certificate.certificateImage || { url: "", public_id: "" },
  notes: certificate.notes || "",
  createdAt: certificate.createdAt,
  updatedAt: certificate.updatedAt,
});

export const ensureDefaultCertificateSeed = async () => {
  const existingCertificate = await Certificate.findOne({
    certificateId: DEFAULT_CERTIFICATE.certificateId,
  });

  if (!existingCertificate) {
    await Certificate.create(DEFAULT_CERTIFICATE);
    return;
  }

  if (!existingCertificate.certificateImage?.url) {
    existingCertificate.certificateImage = DEFAULT_CERTIFICATE.certificateImage;
  }

  if (existingCertificate.role !== DEFAULT_CERTIFICATE.role) {
    existingCertificate.role = DEFAULT_CERTIFICATE.role;
  }

  await existingCertificate.save();
};

export const getCertificateById = catchAsyncErrors(async (req, res, next) => {
  const certificateId = normalizeCertificateId(req.params.certificateId);
  const certificate = await Certificate.findOne({ certificateId });

  if (!certificate) {
    return next(new ErrorHandler("Certificate not found", 404));
  }

  res.status(200).json({
    success: true,
    certificate: mapCertificate(certificate),
  });
});

export const searchCertificate = catchAsyncErrors(async (req, res, next) => {
  const certificateId = normalizeCertificateId(req.query.certificateId);

  if (!certificateId) {
    return next(new ErrorHandler("certificateId query is required", 400));
  }

  const certificate = await Certificate.findOne({ certificateId });

  if (!certificate) {
    return next(new ErrorHandler("Certificate not found", 404));
  }

  res.status(200).json({
    success: true,
    certificate: mapCertificate(certificate),
  });
});

export const upsertCertificate = catchAsyncErrors(async (req, res, next) => {
  const {
    certificateId,
    name,
    role,
    duration,
    startDate,
    endDate,
    completionDate,
    issueDate,
    certificateImageUrl,
    certificateImagePublicId,
    notes,
  } = req.body || {};

  const normalizedId = normalizeCertificateId(certificateId);

  if (!normalizedId || !name || !role || !duration || !startDate || !endDate || !completionDate) {
    return next(
      new ErrorHandler(
        "certificateId, name, role, duration, startDate, endDate, and completionDate are required",
        400
      )
    );
  }

  const certificate = await Certificate.findOneAndUpdate(
    { certificateId: normalizedId },
    {
      certificateId: normalizedId,
      name,
      role,
      duration,
      startDate,
      endDate,
      completionDate,
      issueDate: issueDate || "",
      notes: notes || "",
      ...(certificateImageUrl
        ? {
            certificateImage: {
              url: certificateImageUrl,
              public_id: certificateImagePublicId || "",
            },
          }
        : {}),
    },
    {
      upsert: true,
      new: true,
      runValidators: true,
      setDefaultsOnInsert: true,
    }
  );

  res.status(200).json({
    success: true,
    certificate: mapCertificate(certificate),
  });
});

export const uploadCertificateImage = catchAsyncErrors(async (req, res, next) => {
  const { image, certificateId } = req.body || {};
  const normalizedId = normalizeCertificateId(certificateId);

  if (!image) return next(new ErrorHandler("Image is required", 400));
  if (!normalizedId) return next(new ErrorHandler("certificateId is required", 400));

  const uploaded = await upload_file(image, `toolzite/certificates/${normalizedId}`);

  res.status(200).json({
    success: true,
    image: uploaded,
  });
});
