import { Link, useParams } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { motion } from "framer-motion";
import { products } from "@/data/products";

export default function ProductShowcase() {
  const { lang } = useParams();
  const { t } = useTranslation();

  return (
    <section>
      {products.map((product, i) => {
        const isEven = i % 2 === 0;
        const bg = isEven ? "#ffffff" : "#f5f3ef";

        return (
          <div key={product.id}>
            {/* Section divider */}
            {i > 0 && (
              <div
                style={{
                  background:
                    "linear-gradient(90deg, transparent, rgba(0,0,0,0.08), transparent)",
                  height: "1px",
                }}
              />
            )}

            <Link
              to={`/${lang}/kits/${product.slug}`}
              className="group block"
              style={{ background: bg }}
            >
              <div
                style={{
                  padding:
                    "clamp(6rem, 15vh, 12rem) clamp(1.5rem, 6vw, 6rem)",
                }}
                className="max-w-[1400px] mx-auto"
              >
                <div
                  className={`flex flex-col ${
                    isEven ? "md:flex-row" : "md:flex-row-reverse"
                  } items-center`}
                  style={{ gap: "clamp(2rem, 5vw, 5rem)" }}
                >
                  {/* Product Image — 55% */}
                  <motion.div
                    className="w-full md:w-[55%] relative"
                    initial={{ opacity: 0, x: isEven ? -40 : 40 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
                  >
                    {/* Ambient glow */}
                    <div
                      className="absolute inset-0 -z-10"
                      style={{
                        background:
                          "radial-gradient(ellipse, rgba(255,74,28,0.06) 0%, transparent 70%)",
                      }}
                    />
                    <img
                      src={product.heroImage}
                      alt={product.name}
                      className="w-full object-contain group-hover:scale-[1.03] group-hover:-translate-y-2"
                      style={{
                        maxHeight: "clamp(300px, 50vh, 600px)",
                        filter:
                          "drop-shadow(0 20px 40px rgba(0,0,0,0.15))",
                        transition:
                          "transform 0.6s cubic-bezier(0.16, 1, 0.3, 1)",
                      }}
                      loading={i < 2 ? "eager" : "lazy"}
                    />
                  </motion.div>

                  {/* Info — 45% */}
                  <motion.div
                    className={`w-full md:w-[45%] ${
                      isEven ? "" : "md:text-right"
                    }`}
                    initial={{ opacity: 0, y: 40 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{
                      duration: 1,
                      delay: 0.15,
                      ease: [0.16, 1, 0.3, 1],
                    }}
                  >
                    {/* Model name */}
                    <h2
                      className="group-hover:text-[#ff4a1c]"
                      style={{
                        fontSize: "clamp(2.8rem, 7vw, 7rem)",
                        lineHeight: 0.92,
                        letterSpacing: "-0.04em",
                        fontWeight: 700,
                        color: "#0a0a0a",
                        transition:
                          "color 0.4s cubic-bezier(0.16, 1, 0.3, 1)",
                        marginTop: 0,
                      }}
                    >
                      {product.name}
                    </h2>

                    {/* Tagline */}
                    <p
                      style={{
                        fontSize: "clamp(1rem, 2vw, 1.3rem)",
                        lineHeight: 1.6,
                        fontWeight: 300,
                        color: "rgba(0,0,0,0.5)",
                        marginTop: "clamp(0.5rem, 1.5vh, 1.5rem)",
                        letterSpacing: "-0.01em",
                      }}
                    >
                      {product.tagline}
                    </p>

                    {/* Spec numbers */}
                    {product.specsHighlight &&
                      product.specsHighlight.length > 0 && (
                        <div
                          className={`flex ${
                            isEven ? "" : "md:justify-end"
                          }`}
                          style={{
                            gap: "clamp(1.5rem, 4vw, 3rem)",
                            marginTop: "clamp(1.5rem, 3vh, 3rem)",
                          }}
                        >
                          {product.specsHighlight
                            .slice(0, 3)
                            .map((spec) => (
                              <div key={spec.label}>
                                <div
                                  style={{
                                    fontSize:
                                      "clamp(2rem, 5vw, 4rem)",
                                    fontWeight: 800,
                                    letterSpacing: "-0.04em",
                                    lineHeight: 0.85,
                                    color: "#0a0a0a",
                                  }}
                                >
                                  {spec.value}
                                </div>
                                <div
                                  style={{
                                    fontSize: "11px",
                                    fontWeight: 600,
                                    textTransform: "uppercase",
                                    letterSpacing: "0.2em",
                                    color: "rgba(0,0,0,0.35)",
                                    marginTop: "0.5rem",
                                  }}
                                >
                                  {spec.label}
                                </div>
                              </div>
                            ))}
                        </div>
                      )}

                    {/* Module badge */}
                    <div
                      style={{
                        marginTop: "clamp(1.5rem, 3vh, 3rem)",
                      }}
                    >
                      <span
                        style={{
                          display: "inline-block",
                          background: "#f0f0f0",
                          color: "#ff4a1c",
                          fontSize: "11px",
                          fontWeight: 600,
                          padding: "6px 14px",
                          borderRadius: "999px",
                          textTransform: "uppercase",
                          letterSpacing: "0.15em",
                        }}
                      >
                        {product.module}
                      </span>
                    </div>

                    {/* CTA */}
                    <div
                      style={{
                        marginTop: "clamp(1.5rem, 3vh, 3rem)",
                      }}
                    >
                      <span
                        className="group-hover:text-[#0a0a0a]"
                        style={{
                          fontSize: "11px",
                          fontWeight: 600,
                          textTransform: "uppercase",
                          letterSpacing: "0.3em",
                          color: "#ff4a1c",
                          transition:
                            "color 0.4s cubic-bezier(0.16, 1, 0.3, 1)",
                        }}
                      >
                        {t("showcase.viewModel") || "Explorar"} →
                      </span>
                    </div>
                  </motion.div>
                </div>
              </div>
            </Link>
          </div>
        );
      })}
    </section>
  );
}
