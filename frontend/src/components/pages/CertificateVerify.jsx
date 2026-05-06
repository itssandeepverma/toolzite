import React, { useEffect, useMemo, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import MetaData from "../layout/MetaData";
import { APP_PATHS } from "../../constants/routes";
import { useGetCertificateByIdQuery } from "../../redux/api/certificateApi";

const DETAIL_ROWS = [
  ["Name", "name"],
  ["Role", "role"],
  ["Issue Date", "issueDate"],
  ["Start Date", "startDate"],
  ["End Date", "endDate"],
];

const normalizeCertificateId = (value = "") => value.toString().trim().toUpperCase();

const CertificateVerify = () => {
  const navigate = useNavigate();
  const { certificateId } = useParams();
  const normalizedCertificateId = useMemo(
    () => normalizeCertificateId(certificateId),
    [certificateId]
  );
  const [searchValue, setSearchValue] = useState(normalizedCertificateId);

  useEffect(() => {
    setSearchValue(normalizedCertificateId);
  }, [normalizedCertificateId]);

  const { data, error, isFetching } = useGetCertificateByIdQuery(normalizedCertificateId, {
    skip: !normalizedCertificateId,
  });

  const certificate = data?.certificate;
  const notFound = Boolean(error?.status === 404);

  const handleSubmit = (event) => {
    event.preventDefault();
    const nextCertificateId = normalizeCertificateId(searchValue);
    if (!nextCertificateId) return;
    navigate(`${APP_PATHS.verify}/${nextCertificateId}`);
  };

  const canonical = normalizedCertificateId
    ? `https://www.toolzite.com${APP_PATHS.verify}/${normalizedCertificateId}`
    : `https://www.toolzite.com${APP_PATHS.verify}`;

  return (
    <>
      <MetaData
        title={normalizedCertificateId ? `Verify Certificate ${normalizedCertificateId}` : "Verify Certificate"}
        description="Verify ToolZite internship certificates by certificate ID."
        canonical={canonical}
        keywords="ToolZite certificate verification, internship certificate verify, certificate ID"
      />

      <main className="tz-verify-page">
        <section className="tz-verify-simple-wrap">
          <div className="tz-verify-shell">
            <form className="tz-verify-search-card" onSubmit={handleSubmit}>
              <label htmlFor="certificateId" className="tz-verify-label">
                Certificate ID
              </label>
              <div className="tz-verify-search-row">
                <input
                  id="certificateId"
                  type="text"
                  value={searchValue}
                  onChange={(event) => setSearchValue(event.target.value.toUpperCase())}
                  className="tz-verify-input"
                />
                <button type="submit" className="tz-verify-button">
                  Verify
                </button>
              </div>
            </form>

            {normalizedCertificateId &&
              (isFetching ? (
                <div className="tz-verify-state-card">
                  <p>Verifying certificate.</p>
                </div>
              ) : notFound ? (
                <div className="tz-verify-state-card tz-verify-state-error">
                  <p>No certificate record matched {normalizedCertificateId}.</p>
                </div>
              ) : certificate ? (
                <div className="tz-verify-panel">
                  <div className="table-responsive">
                    <table className="table tz-verify-table">
                      <tbody>
                        {DETAIL_ROWS.map(([label, key]) => (
                          <tr key={key}>
                            <th scope="row">{label}</th>
                            <td>{certificate[key] || "-"}</td>
                          </tr>
                        ))}
                        <tr>
                          <th scope="row">Certificate Link</th>
                          <td>
                            {certificate?.certificateImage?.url ? (
                              <a
                                href={certificate.certificateImage.url}
                                target="_blank"
                                rel="noreferrer"
                                className="tz-verify-basic-link"
                              >
                                Open Certificate
                              </a>
                            ) : (
                              "-"
                            )}
                          </td>
                        </tr>
                      </tbody>
                    </table>
                  </div>
                </div>
              ) : null)}
          </div>
        </section>
      </main>
    </>
  );
};

export default CertificateVerify;
